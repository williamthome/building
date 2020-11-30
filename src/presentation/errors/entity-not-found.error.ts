import { EntityName } from '@/shared/types'

export class EntityNotFoundError extends Error {
  constructor (entityName: EntityName) {
    super(`Can not find ${entityName.toLowerCase()}`)
    this.name = 'EntityNotFoundError'
  }
}