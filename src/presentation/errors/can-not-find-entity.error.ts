import { EntityName } from '../constants'

export class CanNotFindEntityError extends Error {
  constructor (entityName: EntityName) {
    super(`Can not find ${entityName.toLowerCase()}`)
    this.name = 'CanNotFindEntityError'
  }
}