import { Alias, Id } from '../types'

export interface IdAlias<T> {
  id: Id<T>,
  alias: Alias<T>
}