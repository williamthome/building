import { Token } from '../protocols'
import { TargetType } from '../types'

export interface ClassDefinitions <T> {
  target: TargetType<T>
  properties: Token<any>[]
}