import { Token } from '../protocols'

export interface IToken<T> {
  token: Token<T>
  instances: T[]
  resolved?: boolean
}