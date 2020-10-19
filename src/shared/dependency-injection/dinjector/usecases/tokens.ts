import { InjectConstructor } from '../../injector/types'
import { TokenDefinitions } from '../definitions'
import { aliasToString, isToken } from '../helpers'
import { Token, TokensMap } from '../protocols'
import { Alias } from '../types'

export class Tokens extends Map<Token, TokenDefinitions> implements TokensMap {
  inject = (token: Token, definitions: Omit<TokenDefinitions, 'instances'>): void => {
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

  getTokenDefinitions = (token: Token): TokenDefinitions => {
    const tokenDefinitions = this.get(token)
    if (!tokenDefinitions) throw new Error(`Token ${token.constructor.name} is invalid`)
    return tokenDefinitions
  }

  getInstances = (token: Token): any[] => {
    const tokenDefinitions = this.getTokenDefinitions(token)
    return tokenDefinitions.instances
  }

  getTokenDefinitionsByConstructor = (constructor: InjectConstructor): TokenDefinitions => {
    let definitions
    for (const [token, tokenDefinitions] of this) {
      if (tokenDefinitions.constructor && tokenDefinitions.constructor === constructor) {
        definitions = tokenDefinitions
        break
      }
    }
    if (!definitions) throw new Error(`Constructor ${constructor.name} is invalid`)
    return definitions
  }

  getTokenDefinitionsByAlias = (alias: Alias): TokenDefinitions => {
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