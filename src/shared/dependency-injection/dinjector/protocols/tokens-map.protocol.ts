import { Token } from '.'
import { TokenDefinitions } from '../definitions'
import { Alias } from '../types'

export interface TokensMap extends Map<Token, TokenDefinitions> {
  inject: (token: Token, definitions: Omit<TokenDefinitions, 'instances'>) => void
  getTokenDefinitions: (alias: Alias) => TokenDefinitions
  getInstances: (alias: Alias) => any[]
}