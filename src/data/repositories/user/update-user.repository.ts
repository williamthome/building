import { ModelDto } from '@/data/protocols'
import { UserModel } from '@/data/models'

export interface UpdateUserRepository {
  updateUser: (
    userId: UserModel['id'],
    userDto: ModelDto<UserModel>
  ) => Promise<UserModel | null>
}