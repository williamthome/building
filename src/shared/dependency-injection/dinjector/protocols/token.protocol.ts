import { AliasType, TargetType, RecordType } from '../types'

export interface Token<T> extends RecordType {
  target: TargetType<T>,
  alias: AliasType<T>
}