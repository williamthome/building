export interface Entity {
  id: string
}

export type EntityType<T extends Entity> = Omit<T, 'id'>

export interface SchemaOptions {
  kind: unknown,
  required?: boolean,
  unique?: boolean
}

export type Schema<T extends Entity> = {
  [P in keyof Required<EntityType<T>>]: SchemaOptions
}