import { Entity } from '@/domain/core/entities.core'

export class EntityModel implements Entity {
  constructor (public readonly id: string) {}
}