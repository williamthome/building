import { InjectConstructor, Alias, Property } from '../types'

export interface Token extends Property {
  constructor: InjectConstructor,
  alias: Alias
}