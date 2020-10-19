import { Alias } from '../types/alias'
import { TokenDefinitions } from '../definitions'

export interface TokensMap extends Map<Alias, TokenDefinitions> {
  inject: (alias: Alias, definitions: Omit<TokenDefinitions, 'instances'>) => void
}