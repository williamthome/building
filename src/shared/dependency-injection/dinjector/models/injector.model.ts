import { EventEmitter } from 'events'

type InjectorTarget<T> = { new(...args: any[]): T }
type InjectorId<T> = InjectorTarget<T> | string
type InjectorAlias<T> = string | InjectorTarget<T>

interface InjectorIdalias<T> {
  id: InjectorId<T>,
  alias: InjectorAlias<T>
}

interface InjectorProperty {
  name: string,
  descriptor: PropertyDescriptor
}

export class InjectorMap<TTarget = unknown, TValue = unknown> {
  private map: Map<InjectorIdalias<TTarget>, InjectorModel<TTarget, TValue>>

  constructor () { this.map = new Map() }

  push = (newModel: InjectorModel<TTarget, TValue>, kind: 'class' | 'property'): void => {
    // Add a listener to observe model updates
    newModel.onUpdate((updatedModel: InjectorModel<TTarget, TValue>) => {
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
      console.log(`[INJECTOR MAP] Model id ${updatedModel.idalias} updated`)
    })

    // Loop througt map to set updated properties to model
    for (const [, model] of this.map) {
      if (kind === 'class') {
        // Push class properties
        if (model.property && model.dependencyIds.some(id => id === (typeof newModel.idalias.id === 'string' ? newModel.idalias.id : newModel.idalias.id.name))) {
          newModel.pushProperty(model.property)
        }
      } else { // is property
        // Push dependencies to property
        if (model.idalias.alias === newModel.idalias.alias && model.idalias.id !== newModel.idalias.id) {
          model.pushDependency(newModel.idalias.id)
        }
        // Copy properties from a existing class
        if (newModel.property && model.idalias.alias === newModel.idalias.alias) {
          newModel.properties.push(...model.properties)
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

  setValue = (alias: InjectorAlias<TTarget>, value: TValue | undefined): void => {
    const model = this.getByAlias(alias)
    if (model) model.value = value
    else throw new Error(`Unknown alias: ${alias}`)
  }

  get = <T> (id: InjectorId<T>): InjectorModel<TTarget, TValue> | undefined => {
    for (const [, model] of this.map) {
      if (typeof id === 'string' && typeof model.idalias.id !== 'string'
        ? id === model.idalias.id.name
        : id === model.idalias.id
      ) return model
    }
  }

  getByAlias = <T> (alias: InjectorAlias<T>): InjectorModel<TTarget, TValue> | undefined => {
    for (const [, model] of this.map) {
      if (model.idalias.alias === alias) return model
    }
  }

  reset = (): void => {
    for (const [, model] of this.map) model.dispose
    this.map.clear
  }

  all = (): IterableIterator<[InjectorIdalias<TTarget>, InjectorModel<TTarget, TValue>]> => {
    return this.map.entries()
  }

  resolve = <T> (id: InjectorId<T>): T => {
    let model = this.get<T>(id)
    if (!model) throw new Error(`Unknown id: ${id}`)

    if (typeof model.idalias.id === 'string') {
      model = this.getByAlias(model.idalias.alias)
      if (!model) throw new Error(`Unknown id: ${id}`)
    }

    if (typeof model.idalias.id === 'string')
      throw new Error('Just classes can be resolved')

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

    // Reolve undefined properties if class

    model.pushResolved<T>(resolved)

    return resolved
  }
}

export class InjectorModel<TTarget, TValue> {
  private readonly _emitter: EventEmitter
  private readonly _instances: InjectorModel<TTarget, TValue>[]
  private readonly _properties: InjectorProperty[]
  private readonly _dependencyIds: InjectorId<TTarget>[]
  private readonly _resolved: unknown[]
  private _value?: TValue

  constructor (
    public readonly idalias: InjectorIdalias<TTarget>,
    public readonly property?: InjectorProperty,
    dependencyId?: InjectorId<TTarget>
  ) {
    this._emitter = new EventEmitter({
      captureRejections: true
    })
    this._instances = [this]
    this._properties = []
    this._dependencyIds = dependencyId ? [dependencyId] : []
    this._resolved = []
  }

  get instances (): InjectorModel<TTarget, TValue>[] {
    return this._instances
  }

  get properties (): InjectorProperty[] {
    return this._properties
  }

  get dependencyIds (): InjectorId<TTarget>[] {
    return this._dependencyIds
  }

  get resolved (): unknown[] {
    return this._resolved
  }

  get value (): TValue | undefined {
    return this._value
  }

  set value (payload: TValue | undefined) {
    this._value = payload
    console.log(`[VALUE UPDATED] Model ${this.idalias.id} updated`)
    this.notifyChanges()
  }

  updateProperty = (property: InjectorProperty): void => {
    const oldPropertyIndex = this.properties.findIndex(p => p.name === property.name)
    if (oldPropertyIndex === -1)
      throw new Error(`Property ${property.name} inexists in ${this.idalias.id}`)
    Object.defineProperty(this, property.name, property.descriptor)
    this._properties[oldPropertyIndex] = property
    this.notifyChanges()
  }

  pushInstance = (instance: InjectorModel<TTarget, TValue>): void => {
    this._instances.push(instance)
    console.log(`[INSTANCE ADDED] New instance for ${this.idalias.id}`)
    this.notifyChanges()
  }

  pushProperty = (property: InjectorProperty): void => {
    this._properties.push(property)
    console.log(`[PROPERTY ADDED] New property for ${this.idalias.id}`)
    this.notifyChanges()
  }

  pushDependency = (dependency: InjectorId<TTarget>): void => {
    this._dependencyIds.push(dependency)
    console.log(`[DEPENDENCY ADDED] New dependency for ${this.idalias.id}`)
    this.notifyChanges()
  }

  pushResolved = <T> (resolved: T): void => {
    this._resolved.push(resolved)
    console.log(`[RESOLVED ADDED] New resolved for ${this.idalias.id}`)
    this.notifyChanges()
  }

  private notifyChanges = (): void => {
    this._emitter.emit('updated', this)
  }

  onUpdate = (listener: (...args: any[]) => void): EventEmitter => {
    return this._emitter.on('updated', listener)
  }

  dispose = (): void => {
    this._emitter.removeAllListeners()
  }
}