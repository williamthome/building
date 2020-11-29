import { CollectionName } from '@/shared/types'

export class PlanLimitExceededError extends Error {
  constructor (collectionName: CollectionName | 'members') {
    super(`Plan limit exceeded for ${collectionName}`)
    this.name = 'PlanLimitExceededError'
  }
}