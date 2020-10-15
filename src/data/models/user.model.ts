import { EntityModel } from '../core/models.core'
import { UserEntity } from '@/domain/entities/user.entity'

export class UserModel extends EntityModel implements UserEntity {
  constructor (
    public readonly id: string,
    public readonly name: string,
    public readonly address: string
  ) {
    super(id)
  }
}