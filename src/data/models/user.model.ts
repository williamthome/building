import { Model } from '../protocols/model.protocol'
import { UserEntity } from '@/domain/entities/user.entity'
import { Address } from '@/domain/entities/nested'

export class UserModel extends Model implements UserEntity {
  constructor (
    public readonly id: string,
    public readonly name: string,
    public readonly password: string,
    public readonly address?: Address
  ) {
    super(id)
  }
}