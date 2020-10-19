import { Alias } from '../types'
import { TokenDefinitions } from '../definitions'
import { TokensMap } from '../protocols'

export class Tokens extends Map<Alias, TokenDefinitions> implements TokensMap {
  inject = (alias: Alias, definitions: Omit<TokenDefinitions, 'instances'>): void => {
    this.set(
      alias,
      {
        ...definitions,
        instances: []
      }
    )
  }
}