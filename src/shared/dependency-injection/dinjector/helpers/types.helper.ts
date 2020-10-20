import { Token } from '../protocols'

export const isToken = <T = any> (obj: any): obj is Token<T> => {
  const constructorKey: keyof Token<T> = 'constructor'
  const aliasKey: keyof Token<T> = 'alias'
  return typeof obj === 'object' && constructorKey in obj && aliasKey in obj
}