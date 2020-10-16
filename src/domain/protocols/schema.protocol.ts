import { Entity, EntityDto } from './entity.protocol'

export interface SchemaOptions {
  kind: unknown,
  required?: boolean,
  unique?: boolean
}

export type Schema<T extends Entity> = {
  [P in keyof Required<EntityDto<T>>]: SchemaOptions
}