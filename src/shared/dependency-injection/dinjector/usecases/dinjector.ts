import { Injector, Token, TokensMap } from '../protocols'
import { Tokens } from '.'
import { ClassDefinitions, PropertyDefinitions, TokenDefinitions } from '../definitions'
import { Alias, DecoratorOptions, InjectConstructor } from '../types'
import { defineTargetInjectedTokensMetadata, getObjectInjectedTokens, isAliasInjectConstructor, isToken, minimizeAlias } from '../helpers'

export class DInjector implements Injector {
  private _tokens: TokensMap

  constructor () {
    this._tokens = new Tokens()
  }

  get tokens (): TokensMap {
    return this._tokens
  }

  public injectClass = (definitions: Omit<ClassDefinitions, 'kind' | 'properties'>, options?: DecoratorOptions): void => {
    const token: Token = {
      constructor: definitions.constructor,
      alias: options?.alias || definitions.constructor
    }

    const properties = this.getClassProperties(token.constructor)

    this.tokens.inject(
      token,
      {
        kind: 'class',
        ...definitions,
        token,
        properties
      }
    )
  }

  public injectProperty = (definitions: Omit<PropertyDefinitions, 'kind'>, options?: DecoratorOptions): void => {
    const token: Token = {
      constructor: definitions.parent,
      alias: options?.alias ? minimizeAlias(options.alias): definitions.propertyName
    }

    this.tokens.inject(
      token,
      {
        kind: 'property',
        ...definitions,
        token
      }
    )

    defineTargetInjectedTokensMetadata(definitions, token)
  }

  public resolve = async (alias: Alias): Promise<TokenDefinitions> => {
    return new Promise(resolve => {
      const tokenDefinitions = this.tokens.getTokenDefinitions(alias)

      const { kind, parent: target } = tokenDefinitions

      if (kind === 'property') {
        const injectedTokens = getObjectInjectedTokens(target)
      }

      resolve(tokenDefinitions)
    })
  }

  private getClassProperties = (constructor: InjectConstructor): TokenDefinitions[] => {
    const properties: TokenDefinitions[] = []
    for (const [token, tokenDefinitions] of this.tokens) {
      if (token.constructor && token.constructor === constructor) {
        properties.push(tokenDefinitions)
      }
    }
    return properties
  }
}