import { EntityName } from '@/domain/protocols'

export class CanNotFindEntityError extends Error {
  constructor (entityName: EntityName) {
    super(`Can not find ${entityName.toLowerCase()}`)
    this.name = 'CanNotFindEntityError'
  }
}