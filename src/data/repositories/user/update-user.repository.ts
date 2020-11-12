import { ModelDto } from '@/data/protocols/model.protocol'
import { UserModel } from '@/data/models/user.model'

export interface UpdateUserRepository {
  updateUser: (userId: UserModel['id'], userDto: ModelDto<UserModel>) => Promise<UserModel>
}