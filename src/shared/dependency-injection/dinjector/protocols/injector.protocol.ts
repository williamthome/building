import { TokensMap } from '.'
import { ClassDefinitions, PropertyDefinitions, TokenClassDefinitionsType, TokenPropertyDefinitionsType } from '../definitions'
import { Alias, DecoratorOptions, InjectConstructor } from '../types'

export interface Injector {
  tokens: TokensMap
  injectClass: <T> (definitions: TokenClassDefinitionsType<T>, options?: DecoratorOptions) => void
  injectProperty: <T> (definitions: TokenPropertyDefinitionsType<T>, options?: DecoratorOptions) => Promise<void>
  resolve: <T> (toResolve: InjectConstructor<T>) => Promise<T>
}