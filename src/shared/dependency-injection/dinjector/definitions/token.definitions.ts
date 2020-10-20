import { ClassDefinitions, PropertyDefinitions } from '.'
import { Token } from '../protocols'
import { DecoratorDefinitions, DecoratorOptions, InjectConstructor } from '../types'

export type TokenDefinitionsType<T> = Pick<DecoratorDefinitions, 'kind'> & {
  token: Token<T>
  instances: T[]
}

export type TokenClassDefinitionsType<T> = {
  constructor: InjectConstructor<T>
  properties: InjectTokenDefinitionType<any>[]
}

export type TokenPropertyDefinitionsType<T> = {
  parent: InjectConstructor<T>
  propertyName: string | symbol
  propertyIndex: number
  value?: any
}

export type InjectTokenDefinitionType<T> = TokenDefinitionsType<T> & InjectClassTokenDefinitions<T> | InjectPropertyTokenDefinitions<T>

export type InjectClassTokenDefinitions<T> = TokenDefinitionsType<T> & TokenClassDefinitionsType<T>

export type InjectPropertyTokenDefinitions<T> = TokenDefinitionsType<T> & TokenPropertyDefinitionsType<T>