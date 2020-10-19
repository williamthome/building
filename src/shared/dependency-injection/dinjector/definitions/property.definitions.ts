import { DecoratorDefinitions } from '../types'

export interface PropertyDefinitions extends DecoratorDefinitions {
  target: any
  propertyName: string | symbol
  propertyIndex: number
}