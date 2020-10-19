import { Injector, TokensMap } from '../protocols'
import { Tokens } from '.'
import { ClassDefinitions, PropertyDefinitions } from '../definitions'
import { Alias, DecoratorOptions } from '../types'

export class DInjector implements Injector {
  private _tokens: TokensMap

  constructor () {
    this._tokens = new Tokens()
  }

  get tokens(): TokensMap {
    return this._tokens
  }

  injectClass = (definitions: Omit<ClassDefinitions, 'kind'>, options?: DecoratorOptions): void => {
    const alias: Alias = options?.alias || definitions.constructor
    this.tokens.inject(
      alias,
      {
        kind: 'class',
        ...definitions,
        alias,
        value: definitions.constructor
      }
    )
  }

  injectProperty = (definitions: Omit<PropertyDefinitions, 'kind'>, options?: DecoratorOptions): void => {
    const alias: Alias = options?.alias || definitions.propertyName
    this.tokens.inject(
      alias,
      {
        kind: 'property',
        ...definitions,
        alias,
        value: definitions.constructor
      }
    )
  }

  resolve = async (): Promise<void> => {
    return new Promise(resolve => {
      resolve()
    })
  }
}