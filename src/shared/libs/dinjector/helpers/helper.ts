import { Id, Alias } from '../usecases'

export const idAliasToString = (idalias: Id<any> | Alias<any>): string =>
  typeof idalias === 'string' ? idalias : idalias.name