import { Token } from '../protocols'

export const isToken = (obj: any): obj is Token => {
  const constructorKey: keyof Token = 'constructor'
  const aliasKey: keyof Token = 'alias'
  return typeof obj === 'object' && constructorKey in obj && aliasKey in obj
}