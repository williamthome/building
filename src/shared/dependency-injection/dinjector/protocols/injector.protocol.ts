import { TokensMap } from '.'
import { ClassDefinitions, PropertyDefinitions } from '../definitions'
import { DecoratorOptions } from '../types'

export interface Injector {
  tokens: TokensMap
  injectClass: (definitions: Omit<ClassDefinitions, 'kind'>, options?: DecoratorOptions) => void
  injectProperty: (definitions: Omit<PropertyDefinitions, 'kind'>, options?: DecoratorOptions) => void
  resolve: () => Promise<void>
}