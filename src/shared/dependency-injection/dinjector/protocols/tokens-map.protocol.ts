import { Token } from '.'
import { ClassDefinitions, PropertyDefinitions } from '../definitions'
import { AliasType, DefinitionsType, TargetType } from '../types'

export interface TokensMap extends Map<Token<any>, DefinitionsType<any>> {
  injectToken: <T> (token: Token<T>, definitions: Omit<DefinitionsType<T>, 'instances'>) => void
  getDefinitions: <T> (alias: AliasType<T>) => DefinitionsType<T>
  getClassDefinitions: <T> (alias: AliasType<T>) => ClassDefinitions<T>
  getPropertyDefinitions: <T> (alias: AliasType<T>) => PropertyDefinitions<T>
  getClassProperties: (target: TargetType<unknown>) => Token<unknown>[]
  getPropertyDependencies: (alias: AliasType<unknown>) => DefinitionsType<unknown>[]
}