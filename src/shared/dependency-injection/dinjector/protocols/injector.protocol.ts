import { TokensMap } from '.'
import { ClassDefinitions, PropertyDefinitions } from '../definitions'
import { Alias, DecoratorOptions, InjectConstructor } from '../types'
import { Token } from './token'

export interface Injector {
  tokens: TokensMap
  injectClass: (definitions: Omit<ClassDefinitions, 'kind'>, options?: DecoratorOptions) => void
  injectProperty: (definitions: Omit<PropertyDefinitions, 'kind'>, options?: DecoratorOptions) => void
  resolve: (token: Token | InjectConstructor | Alias) => Promise<void>
}