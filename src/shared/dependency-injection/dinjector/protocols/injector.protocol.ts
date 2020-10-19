import { TokensMap } from '.'
import { ClassDefinitions, PropertyDefinitions, TokenDefinitions } from '../definitions'
import { Alias, DecoratorOptions, InjectConstructor } from '../types'

export interface Injector {
  tokens: TokensMap
  injectClass: (definitions: Omit<ClassDefinitions, 'kind'>, options?: DecoratorOptions) => void
  injectProperty: (definitions: Omit<PropertyDefinitions, 'kind'>, options?: DecoratorOptions) => void
  resolve: (alias: Alias) => Promise<TokenDefinitions>
}