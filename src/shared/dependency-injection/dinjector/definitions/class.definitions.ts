import { DecoratorDefinitions } from '../types'
import { TokenDefinitions } from './token.definitions'

export interface ClassDefinitions extends DecoratorDefinitions {
  constructor: any
  properties: TokenDefinitions[]
}