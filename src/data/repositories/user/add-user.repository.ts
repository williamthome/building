import { ModelDto } from '@/data/protocols'
import { UserModel } from '@/data/models'

export interface AddUserRepository {
  addUser: (userDto: ModelDto<UserModel>) => Promise<UserModel>
}