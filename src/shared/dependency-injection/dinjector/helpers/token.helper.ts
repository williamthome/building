import { TokenDefinitionsType } from '../definitions'
import { Token } from '../protocols'
import { Alias } from '../types'

export const isClass = (
  tokenDefinitions: TokenDefinitionsType<any>
): boolean => {
  return tokenDefinitions.kind === 'class'
}

export const isProperty = (
  tokenDefinitions: TokenDefinitionsType<any>
): boolean => {
  return tokenDefinitions.kind === 'property'
}

export const isDependency = (
  alias: Alias<any>,
  token: Token<any>
): boolean => {
  return token.constructor !== alias && token.alias === alias
}