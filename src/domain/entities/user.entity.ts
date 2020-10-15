/********************************************/
/* BASE
/********************************************/

export interface AbstractModel {
  [key: string]: unknown
}

export interface Entity extends AbstractModel {
  id: string
}

export type EntityType<T extends Entity> = Omit<T, 'id'>

interface SchemaOptions {
  required?: boolean,
  unique?: boolean
}

type Schema<T extends Entity> = {
  [P in keyof Required<EntityType<T>>]: SchemaOptions
}

/********************************************/
/* TESTS
/********************************************/

export interface UserEntity extends Entity {
  name: string
  address?: string
}

const userSchema: Schema<UserEntity> = {
  name: {
    required: true,
    unique: false
  },
  address: {
    required: false,
    unique: false
  }
}