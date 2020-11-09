import { Entity } from '@/domain/protocols'
import { OmitOnIndexed } from '@/shared/types'
import { Schema } from '../protocols'

type EntitySchemaType<T extends Entity> = Required<OmitOnIndexed<T, 'id'>>

export type EntitySchema<T extends Entity> = Schema<EntitySchemaType<T>>