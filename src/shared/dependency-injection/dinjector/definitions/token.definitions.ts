import { DecoratorDefinitions } from '.'
import { Token } from '../protocols'

export interface TokenDefinitions<T> extends DecoratorDefinitions {
  token: Token<T>
  instances: T[]
  resolved?: boolean
}