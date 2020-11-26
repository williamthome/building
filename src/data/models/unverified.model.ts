import { Model } from '../protocols'
import { UnverifiedEntity } from '@/domain/entities'
import { UserModel } from './user.model'

export class UnverifiedModel extends Model implements UnverifiedEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly userId: UserModel['id'],
    public readonly expiresIn: number
  ) {
    super(id)
  }
}