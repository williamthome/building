import { EntityName } from '@/domain/protocols'

export class EntityNotFoundError extends Error {
  constructor (entityName: EntityName) {
    super(`Can not find ${entityName.toLowerCase()}`)
    this.name = 'EntityNotFoundError'
  }
}