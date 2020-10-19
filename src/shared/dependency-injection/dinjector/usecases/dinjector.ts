import { Injector, Token, TokensMap } from '../protocols'
import { Tokens } from '.'
import { ClassDefinitions, PropertyDefinitions, TokenDefinitions } from '../definitions'
import { Alias, DecoratorOptions, InjectConstructor } from '../types'
import { defineTargetInjectedTokensMetadata, isAliasInjectConstructor, isToken, minimizeAlias } from '../helpers'

export class DInjector implements Injector {
  private _tokens: TokensMap

  constructor () {
    this._tokens = new Tokens()
  }

  get tokens (): TokensMap {
    return this._tokens
  }

  injectClass = (definitions: Omit<ClassDefinitions, 'kind'>, options?: DecoratorOptions): void => {
    const token: Token = {
      constructor: definitions.constructor,
      alias: options?.alias || definitions.constructor
    }

    this.tokens.inject(
      token,
      {
        kind: 'class',
        ...definitions,
        token,
        value: definitions.constructor
      }
    )
  }

  injectProperty = (definitions: Omit<PropertyDefinitions, 'kind'>, options?: DecoratorOptions): void => {
    const token: Token = {
      constructor: definitions.target,
      alias: options?.alias ? minimizeAlias(options.alias): definitions.propertyName
    }

    this.tokens.inject(
      token,
      {
        kind: 'property',
        ...definitions,
        token,
        value: definitions.constructor
      }
    )

    defineTargetInjectedTokensMetadata(definitions, token)
  }

  resolve = async (toResolve: Token | InjectConstructor | Alias): Promise<void> => {
    return new Promise(resolve => {
      const tokenDefinitions: TokenDefinitions = isToken(toResolve)
        ? this.tokens.getTokenDefinitions(toResolve)
        : isAliasInjectConstructor(toResolve)
          ? this.tokens.getTokenDefinitionsByConstructor(toResolve)
          : this.tokens.getTokenDefinitionsByAlias(toResolve)



      resolve()
    })
  }
}