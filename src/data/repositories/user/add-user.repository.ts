import { ModelDto } from '@/data/protocols/model.protocol'
import { UserModel } from '@/data/models/user.model'

export interface AddUserRepository {
  addUser: (userDto: ModelDto<UserModel>) => Promise<UserModel>
}