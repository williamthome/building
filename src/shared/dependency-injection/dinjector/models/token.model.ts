import { EventEmitter } from 'events'
import { TokenDefinitions } from '../definitions'
import { Token } from '../protocols'
import { DecoratorType } from '../types'

export class TokenModel<T> extends EventEmitter implements TokenDefinitions<T> {
  private _instances: T[]
  private _resolved: boolean

  constructor(
    public readonly kind: DecoratorType,
    public readonly token: Token<T>
  ) {
    super({
      captureRejections: true
    })

    this._instances = []
    this._resolved = false
  }

  get instances(): T[] {
    return this._instances
  }

  get resolved(): boolean {
    return this._resolved
  }

  pushInstance = (payload: T): void => {
    this.instances.push(payload)
    this.emit('pushInstance', payload, this.instances)
  }
}