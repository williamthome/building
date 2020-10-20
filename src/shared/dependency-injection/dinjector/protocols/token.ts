import { Alias, InjectConstructor, Property } from '../types'

export interface Token<T> extends Property {
  constructor: InjectConstructor<T>,
  alias: Alias<T>
}