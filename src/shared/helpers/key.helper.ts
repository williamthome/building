import { IsUnique, OptionalLiteralKeys, RequiredLiteralKeys } from '../types/keys'

export class UniqueKeysOf<T> {
  all = <K extends Array<keyof T>>(...properties: K & IsUnique<K>): K => {
    return properties
  }
  optinal = <K extends Array<OptionalLiteralKeys<T>>>(...properties: K & IsUnique<K>): K => {
    return properties
  }
  required = <K extends Array<RequiredLiteralKeys<T>>>(...properties: K & IsUnique<K>): K => {
    return properties
  }
}
