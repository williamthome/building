import { ClassDefinitions } from '../definitions'
import { IClass, IProperty } from '../interfaces'
import { Token } from '../protocols'
import { TargetType } from '../types'
import { PropertyModel } from './property.model'
import { TokenModel } from './token.model'

export class ClassModel<T> extends TokenModel<T> implements IClass<T> {
  private readonly _properties: IProperty<T>[]

  constructor(
    public readonly token: Token<T>,
    public readonly target: TargetType<T>
  ) {
    super('class', token)

    this._properties = []
  }

  get properties(): IProperty<T>[] {
    return this._properties
  }
}