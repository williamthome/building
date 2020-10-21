import { PropertyDefinitions } from '../definitions'
import { IProperty } from '../interfaces'
import { Token } from '../protocols'
import { TargetType } from '../types'
import { ClassModel } from './class.model'
import { TokenModel } from './token.model'

export class PropertyModel<T> extends TokenModel<T> implements IProperty<T> {
  private _value: any

  constructor(
    public readonly token: Token<T>,
    public readonly parent: ClassModel<T>,
    public readonly propertyName:  string,
    public readonly propertyDescriptor: PropertyDescriptor,
    public readonly propertyIndex: number,
    value?: any
  ) {
    super('property', token)

    this._value = value
  }

  get value(): any {
    return this._value
  }

  set value(payload: any) {
    this.emit('valueChanged', payload)
  }
}