import { Response } from '@/shared/responses'
import { UserEntity } from '../entities/user.entity'

export interface UserRepository {
  addUser: (userDto: Partial<UserEntity>) => Response<UserEntity>
}