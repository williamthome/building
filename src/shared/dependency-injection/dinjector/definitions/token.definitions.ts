import { ClassDefinitions, PropertyDefinitions } from '.'
import { Token } from '../protocols'
import { InjectConstructor } from '../types'

export interface TokenDefinitions
extends
  Partial<ClassDefinitions>,
  Partial<PropertyDefinitions>
{
  token: Token
  value: any
  instances: InjectConstructor[]
}