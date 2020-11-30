import { UserModelDto } from '@/data/protocols'
import { UserModel } from '@/data/models'

export interface UpdateUserRepository {
  updateUser: (
    userId: UserModel['id'],
    userDto: UserModelDto
  ) => Promise<UserModel | null>
}