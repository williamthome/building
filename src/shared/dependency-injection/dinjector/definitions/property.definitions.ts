import { Token } from '../protocols'
import { TargetType } from '../types'

export interface PropertyDefinitions<T> {
  parent: TargetType<T>
  propertyName: string | symbol
  propertyDescriptor: PropertyDescriptor
  propertyIndex: number
  // dependencies: Token<any>[]
  value?: any
}