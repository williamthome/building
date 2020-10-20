import { InjectClassTokenDefinitions, InjectPropertyTokenDefinitions, InjectTokenDefinitionType } from '../definitions'
import { aliasToString, isAliasInjectConstructor } from '../helpers'
import { Token, TokensMap } from '../protocols'
import { Alias, InjectConstructor } from '../types'

export class Tokens extends Map<Token<any>, InjectTokenDefinitionType<any>> implements TokensMap {
  public injectClass = <T> (token: Token<T>, definitions: InjectClassTokenDefinitions<T>): void => {
    const tokenDefinitions = this.get(token)

    const instances: T[] = tokenDefinitions?.instances || []
    const instance = new token.constructor()
    instances.push(instance)

    this.set(
      token,
      {
        ...definitions,
        instances
      }
    )

  }

  public injectProperty = <T> (token: Token<T>, definitions: InjectPropertyTokenDefinitions<T>): void => {
    const tokenDefinitions = this.get(token)

    const instances: T[] = tokenDefinitions?.instances || []
    const instance = new token.constructor()
    instances.push(instance)

    this.set(
      token,
      {
        ...definitions,
        instances
      }
    )
  }

  public getTokenDefinitions = <T> (alias: Alias<T>): InjectTokenDefinitionType<T> => {
    const tokenDefinitions = isAliasInjectConstructor<T>(alias)
      ? this.getTokenDefinitionsByConstructor<T>(alias)
      : this.getTokenDefinitionsByAlias<T>(alias)
    return tokenDefinitions
  }

  public getInstances = <T> (alias: Alias<T>): T[] => {
    const tokenDefinitions = this.getTokenDefinitions(alias)
    return tokenDefinitions.instances
  }

  private getTokenDefinitionsByConstructor = <T> (constructor: InjectConstructor<T>): InjectTokenDefinitionType<T> => {
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

  private getTokenDefinitionsByAlias = <T> (alias: Alias<T>): InjectTokenDefinitionType<T> => {
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