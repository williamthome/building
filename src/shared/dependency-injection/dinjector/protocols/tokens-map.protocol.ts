import { Token } from '.'
import { ClassDefinitions, InjectClassTokenDefinitions, InjectPropertyTokenDefinitions, InjectTokenDefinitionType} from '../definitions'
import { Alias } from '../types'

export interface TokensMap extends Map<Token<any>, InjectTokenDefinitionType<any>> {
  injectClass: <T> (token: Token<T>, definitions: InjectClassTokenDefinitions<T>) => void
  injectProperty: <T> (token: Token<T>, definitions: InjectPropertyTokenDefinitions<T>) => void
  getTokenDefinitions: <T> (alias: Alias<T>) => InjectTokenDefinitionType<T>
  getInstances: <T> (alias: Alias<T>) => T[]
}