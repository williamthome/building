import { Entity } from '@/domain/protocols'
import { Schema } from '../protocols'

type EntitySchemaType<T extends Entity> = Required<Omit<T, 'id'>>

export type EntitySchema<T extends Entity> = Schema<EntitySchemaType<T>>