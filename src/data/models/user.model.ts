import { Model } from '../protocols/model.protocol'
import { UserEntity } from '@/domain/entities/user.entity'

export class UserModel extends Model implements UserEntity {
  constructor (
    public readonly id: string,
    public readonly name: string,
    public readonly address?: string
  ) {
    super(id)
  }
}