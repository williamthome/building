import { Injector, Token, TokensMap } from '../protocols'
import { Tokens } from '.'
import { ClassDefinitions, InjectClassTokenDefinitions, InjectPropertyTokenDefinitions, InjectTokenDefinitionType, PropertyDefinitions, TokenClassDefinitionsType, TokenDefinitionsType, TokenPropertyDefinitionsType } from '../definitions'
import { Alias, DecoratorOptions, InjectConstructor } from '../types'
import { aliasToString, defineTargetInjectedTokensMetadata, getObjectInjectedTokens, isAliasInjectConstructor, isToken, minimizeAlias } from '../helpers'

export class DInjector implements Injector {
  private _tokens: TokensMap

  constructor () {
    this._tokens = new Tokens()
  }

  get tokens (): TokensMap {
    return this._tokens
  }

  public injectClass = <T> (definitions: TokenClassDefinitionsType<T>, options?: DecoratorOptions): void => {
    const token: Token<T> = {
      constructor: definitions.constructor,
      alias: options?.alias || definitions.constructor
    }

    const properties = this.getClassProperties(token.constructor)

    this.tokens.injectClass<T>(
      token,
      {
        kind: 'class',
        ...definitions,
        token,
        properties,
        instances: []
      }
    )
  }

  public injectProperty = <T> (definitions: TokenPropertyDefinitionsType<T>, options?: DecoratorOptions): void => {
    const token: Token<T> = {
      constructor: definitions.parent,
      alias: options?.alias ? minimizeAlias(options.alias) : definitions.propertyName
    }

    this.tokens.injectProperty<T>(
      token,
      {
        kind: 'property',
        ...definitions,
        token,
        instances: []
      }
    )

    defineTargetInjectedTokensMetadata(definitions, token)
  }

  public resolve = async <T> (toResolve: InjectConstructor<T>): Promise<T> => {
    return new Promise(resolve => {
      const tokenDefinitions = this.tokens.getTokenDefinitions<T>(toResolve)

      const classDefinitions = tokenDefinitions as InjectClassTokenDefinitions<T>
      const { constructor, properties } = classDefinitions

      const propertiesDefinitions = properties as InjectPropertyTokenDefinitions<T>[]

      const instance = new constructor()

      this.updateClassProperty<T>(constructor, propertiesDefinitions, instance)

      resolve(instance)
    })
  }

  private getClassProperties = <T> (constructor: InjectConstructor<T>): InjectPropertyTokenDefinitions<T>[] => {
    const properties: InjectPropertyTokenDefinitions<T>[] = []
    for (const [token, tokenDefinitions] of this.tokens) {
      if (token.constructor && token.constructor === constructor && tokenDefinitions.kind === 'property') {
        properties.push(tokenDefinitions as InjectPropertyTokenDefinitions<T>)
      }
    }
    return properties
  }

  defineProperty = <T> (alias: Alias<T>, value: unknown): void => {
    const definitions = this.tokens.getTokenDefinitions(alias)

    if (definitions.kind !== 'property') throw new Error(`${aliasToString(alias)} must be a property`)

    const updatedDefinition: InjectTokenDefinitionType<T> = { ...definitions, value }

    this.tokens.set(definitions.token, updatedDefinition)
  }

  updateClassProperty = <T> (
    constructor: InjectConstructor<T>,
    propertiesDefinitions: InjectPropertyTokenDefinitions<T>[],
    instance?: T
  ): void => {
    const storedProperties = this.getClassProperties(constructor)

    for (const token of propertiesDefinitions) {
      const storedProperty = storedProperties.find(p => p.propertyName === token.propertyName)

      if (!storedProperty) throw new Error(`Property ${token.propertyName.toString()} inexists`)

      Object.defineProperty(instance || new constructor(), token.propertyName, {
        value: storedProperty.value
      })
    }
  }
}