import { ClassDefinitions, PropertyDefinitions, TokenDefinitions } from '../definitions'

export type DefinitionsType<T> =
  TokenDefinitions<T>
  & Partial<ClassDefinitions<T>>
  & Partial<PropertyDefinitions<T>>