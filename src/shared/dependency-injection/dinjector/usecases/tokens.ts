import { InjectConstructor } from '../../injector/types'
import { TokenDefinitions } from '../definitions'
import { aliasToString, isAliasInjectConstructor } from '../helpers'
import { Token, TokensMap } from '../protocols'
import { Alias } from '../types'

export class Tokens extends Map<Token, TokenDefinitions> implements TokensMap {
  public inject = (token: Token, definitions: Omit<TokenDefinitions, 'instances'>): void => {
    const tokenDefinitions = this.get(token)
    const instances = tokenDefinitions?.instances || []
    instances.push(token.constructor)

    this.set(
      token,
      {
        ...definitions,
        instances
      }
    )
  }

  public getTokenDefinitions = (alias: Alias): TokenDefinitions => {
    const tokenDefinitions = isAliasInjectConstructor(alias)
      ? this.getTokenDefinitionsByConstructor(alias)
      : this.getTokenDefinitionsByAlias(alias)
    return tokenDefinitions
  }

  public getInstances = (alias: Alias): any[] => {
    const tokenDefinitions = this.getTokenDefinitions(alias)
    return tokenDefinitions.instances
  }

  private getTokenDefinitionsByConstructor = (constructor: InjectConstructor): TokenDefinitions => {
    let definitions
    for (const [, tokenDefinitions] of this) {
      if (tokenDefinitions.constructor && tokenDefinitions.constructor === constructor) {
        definitions = tokenDefinitions
        break
      }
    }
    if (!definitions) throw new Error(`Constructor ${constructor.name} is invalid`)
    return definitions
  }

  private getTokenDefinitionsByAlias = (alias: Alias): TokenDefinitions => {
    let definitions
    for (const [token, tokenDefinitions] of this) {
      if (token.alias && token.alias === alias) {
        definitions = tokenDefinitions
        break
      }
    }
    if (!definitions) throw new Error(`Alias ${aliasToString(alias)} is invalid`)
    return definitions
  }
}