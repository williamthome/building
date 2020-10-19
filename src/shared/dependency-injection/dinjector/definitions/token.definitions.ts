import { ClassDefinitions, PropertyDefinitions } from '.'
import { Alias } from '../types'

export interface TokenDefinitions
extends
  Partial<ClassDefinitions>,
  Partial<PropertyDefinitions>
{
  alias: Alias
  value: any
  instances: any[]
}