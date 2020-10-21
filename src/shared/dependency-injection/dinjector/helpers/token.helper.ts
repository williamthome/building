import { TokenDefinitions } from '../definitions'
import { Token } from '../protocols'
import { AliasType } from '../types'

export const isClass = (
  tokenDefinitions: TokenDefinitions<any>
): boolean => {
  return tokenDefinitions.kind === 'class'
}

export const isProperty = (
  tokenDefinitions: TokenDefinitions<any>
): boolean => {
  return tokenDefinitions.kind === 'property'
}

export const isDependency = (
  alias: AliasType<any>,
  token: Token<any>
): boolean => {
  return token.target !== alias && token.alias === alias
}