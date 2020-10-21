import { TokensMap, DecoratorOptions } from '.'
import { ClassDefinitions, PropertyDefinitions } from '../definitions'
import { AliasType, DefinitionsType, TargetType } from '../types'

export interface Injector {
  injectClass: <T> (definitions: Omit<ClassDefinitions<T>, 'properties'>, options?: DecoratorOptions<T>) => void
  injectProperty: <T> (definitions: Omit<PropertyDefinitions<T>, 'dependencies'>, options?: DecoratorOptions<T>) => Promise<void>
  // resolve: <T> (toResolve: TargetType<T>) => Promise<T>
  getToken: <T> (alias: AliasType<T>) => DefinitionsType<T>
  defineProperty: <T> (alias: AliasType<T>, value: unknown) => void
}