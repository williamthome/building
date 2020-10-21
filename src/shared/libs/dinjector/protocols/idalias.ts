import { Alias, Id } from '../usecases'

export interface IdAlias<T> {
  id: Id<T>,
  alias: Alias<T>
}