import { ClassDefinitions, PropertyDefinitions } from '.'
import { Token } from '../protocols'
import { DecoratorDefinitions, InjectConstructor } from '../types'

export interface TokenDefinitions
extends
  DecoratorDefinitions,
  Partial<Omit<ClassDefinitions, 'kind'>>,
  Partial<Omit<PropertyDefinitions, 'kind'>>
{
  token: Token
  instances: InjectConstructor[]
}