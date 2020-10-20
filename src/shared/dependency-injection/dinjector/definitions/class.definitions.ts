import { DecoratorDefinitions, InjectConstructor } from '../types'
import { InjectPropertyTokenDefinitions } from './token.definitions'

export interface ClassDefinitions <T> extends DecoratorDefinitions {
  constructor: InjectConstructor<T>
  properties: InjectPropertyTokenDefinitions<any>[]
}