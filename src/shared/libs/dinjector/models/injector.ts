import { EventEmitter } from 'events'
import { idAliasToString } from '../helpers'
import { IdAlias, Properties } from '../protocols'
import { Id } from '../usecases'

export class Injector<TTarget, TValue> {
  private readonly _emitter: EventEmitter
  private readonly _instances: Injector<TTarget, TValue>[]
  private readonly _properties: Properties[]
  private readonly _dependencyIds: Id<TTarget>[]
  private readonly _resolved: unknown[]
  private _value?: TValue

  constructor (
    public readonly idalias: IdAlias<TTarget>,
    public readonly property?: Properties,
    dependencyId?: Id<TTarget>
  ) {
    this._emitter = new EventEmitter({
      captureRejections: true
    })
    this._instances = [this]
    this._properties = []
    this._dependencyIds = dependencyId ? [dependencyId] : []
    this._resolved = []
  }

  toString = (): string => {
    const { id, alias } = this.idalias
    return `'id: ${idAliasToString(id)} | alias: ${idAliasToString(alias)}'`
  }

  get instances (): Injector<TTarget, TValue>[] {
    return this._instances
  }

  get properties (): Properties[] {
    return this._properties
  }

  get dependencyIds (): Id<TTarget>[] {
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
    console.log(`[VALUE UPDATED] Model ${this.toString()} updated`)
    this.notifyChanges()
  }

  updateProperty = (property: Properties): void => {
    const oldPropertyIndex = this.properties.findIndex(p => p.name === property.name)
    if (oldPropertyIndex === -1)
      throw new Error(`Property ${property.name} inexists in ${this.toString()}`)
    Object.defineProperty(this, property.name, property.descriptor)
    this._properties[oldPropertyIndex] = property
    this.notifyChanges()
  }

  pushInstance = (instance: Injector<TTarget, TValue>): void => {
    this._instances.push(instance)
    console.log(`[INSTANCE ADDED] New instance for ${this.toString()}`)
    this.notifyChanges()
  }

  pushProperty = (property: Properties): void => {
    this._properties.push(property)
    console.log(`[PROPERTY ADDED] New property for ${this.toString()}`)
    this.notifyChanges()
  }

  pushDependency = (dependency: Id<TTarget>): void => {
    this._dependencyIds.push(dependency)
    console.log(`[DEPENDENCY ADDED] New dependency for ${this.toString()}`)
    this.notifyChanges()
  }

  pushResolved = <T> (resolved: T): void => {
    this._resolved.push(resolved)
    console.log(`[RESOLVED ADDED] New resolved for ${this.toString()}`)
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