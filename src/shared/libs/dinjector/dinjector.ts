import { Injector } from './models'
import { IdAlias } from './protocols'
import { Alias, Id } from './usecases'
import { idAliasToString } from './helpers'

export default new class DInjector<TTarget = unknown, TValue = unknown> {

  private map: Map<IdAlias<TTarget>, Injector<TTarget, TValue>>

  constructor () { this.map = new Map() }

  push = (newModel: Injector<TTarget, TValue>, kind: 'class' | 'property'): void => {
    // Add a listener to observe model updates
    newModel.onUpdate((updatedModel: Injector<TTarget, TValue>) => {
      const { property, dependencyIds } = updatedModel
      if (!property) return
      for (const dependencyId of dependencyIds) {
        const depedencyModel = this.get(dependencyId)
        if (depedencyModel) {
          property.descriptor.value = updatedModel.value
          // Update dependencies property
          if (depedencyModel.properties.some(p => p.name === property.name)) {
            depedencyModel.updateProperty(property)
          }
          // Update resolved property
          for (const resolved of depedencyModel.resolved) {
            Object.defineProperty(resolved, property.name, property.descriptor)
          }
        }
      }
      // Store updated model on map
      this.map.set(updatedModel.idalias, updatedModel)
      console.log(`[INJECTOR MAP] Model id ${updatedModel.toString()} updated`)
    })

    // Loop througt map to set updated properties to model
    for (const [, model] of this.map) {
      if (kind === 'class') {
        // Push class properties
        if (model.property && model.dependencyIds.some(id => id === (typeof newModel.idalias.id === 'string' ? newModel.idalias.id : newModel.idalias.id.name))) {
          newModel.pushProperty(model.property)
          console.warn('[INJECTOR/PUSH] Push class properties')
        }
      } else { // is property
        // Push dependencies to property
        if (model.idalias.alias === newModel.idalias.alias && model.idalias.id !== newModel.idalias.id) {
          model.pushDependency(newModel.idalias.id)
          console.warn('[INJECTOR/PUSH] Push dependencies to property')
        }
        // Copy properties from a existing class
        if (newModel.property && model.idalias.alias === newModel.idalias.alias) {
          newModel.properties.push(...model.properties)
          console.warn('[INJECTOR/PUSH] Copy properties from a existing class')
        }
      }
      // The first one is the model, so, skip the first
      if (model.instances.length > 1 && model.idalias.id === newModel.idalias.id) {
        model.pushInstance(newModel)
      }
    }
    // Add or set the model on map
    this.map.set(newModel.idalias, newModel)
  }


  setValue = (alias: Alias<TTarget>, value: TValue | undefined): void => {
    const model = this.getByAlias(alias)
    if (model) model.value = value
    else throw new Error(`Unknown alias: ${alias}`)
  }

  get = <T> (id: Id<T>): Injector<TTarget, TValue> | undefined => {
    for (const [, model] of this.map) {
      if (typeof id === 'string' && typeof model.idalias.id !== 'string'
        ? id === model.idalias.id.name
        : id === model.idalias.id
      ) return model
    }
  }

  getByAlias = <T> (alias: Alias<T>): Injector<TTarget, TValue> | undefined => {
    for (const [, model] of this.map) {
      if (model.idalias.alias === alias) return model
    }
  }

  reset = (): void => {
    for (const [, model] of this.map) model.dispose
    this.map.clear()
  }

  all = (): IterableIterator<[IdAlias<TTarget>, Injector<TTarget, TValue>]> => {
    return this.map.entries()
  }

  resolve = async <T> (id: Id<T>): Promise<T> => {
    return new Promise(resolve => {
      let model = this.get<T>(id)
      if (!model) throw new Error(`Unknown id: ${idAliasToString(id)}`)

      if (typeof model.idalias.id === 'string') {
        model = this.getByAlias(model.idalias.alias)
        if (!model) throw new Error(`Unknown id: ${idAliasToString(id)}`)
      }

      if (typeof model.idalias.id === 'string')
        throw new Error('Only classes can be resolved')

      const resolved: T = new model.idalias.id() as unknown as T

      for (const property of model.properties) {
        if (!property.descriptor.value) {
          const storedModel = this.getByAlias(property.name)
          if (storedModel && typeof storedModel.idalias.id !== 'string') {
            const storedValue = new storedModel.idalias.id()
            for (const storedProperty of storedModel.properties) {
              Object.defineProperty(storedValue, storedProperty.name, storedProperty.descriptor)
            }
            property.descriptor.value = storedValue
          }
        }
        Object.defineProperty(resolved, property.name, property.descriptor)
      }

      model.pushResolved<T>(resolved)

      resolve(resolved)
    })
  }
}