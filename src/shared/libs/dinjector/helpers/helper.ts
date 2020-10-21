import { Id, Alias } from '../types'

export const idAliasToString = (idalias: Id<any> | Alias<any>): string =>
  typeof idalias === 'string' ? idalias : idalias.name