import { DecoratorDefinitions } from '../types'

export interface PropertyDefinitions extends DecoratorDefinitions {
  parent: any
  propertyName: string | symbol
  propertyIndex: number
}