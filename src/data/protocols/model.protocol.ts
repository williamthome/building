import { Entity } from '@/domain/protocols/entity.protocol'

export class Model implements Entity {
  constructor (public readonly id: string) {}
}

export type ModelDto<T extends Model> = Partial<Omit<T, 'id'>>