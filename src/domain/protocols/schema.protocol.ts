import { Entity, EntityDto } from './entity.protocol'

export interface SchemaOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kind: { new (...args: any[]): unknown },
  required?: boolean,
  unique?: boolean
}

export type Schema<T extends Entity> = {
  [P in keyof Required<EntityDto<T>>]: SchemaOptions
}