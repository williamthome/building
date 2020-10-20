import { DecoratorDefinitions, InjectConstructor } from '../types'

export interface PropertyDefinitions <T> extends DecoratorDefinitions {
  parent: InjectConstructor<T>
  propertyName: string | symbol
  propertyIndex: number
}