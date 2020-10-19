import { Token } from '.'
import { TokenDefinitions } from '../definitions'
import { Alias, InjectConstructor } from '../types'

export interface TokensMap extends Map<Token, TokenDefinitions> {
  inject: (token: Token, definitions: Omit<TokenDefinitions, 'instances'>) => void
  getTokenDefinitions: (token: Token) => TokenDefinitions
  getTokenDefinitionsByConstructor: (constructor: InjectConstructor) => TokenDefinitions
  getTokenDefinitionsByAlias: (alias: Alias) => TokenDefinitions
}