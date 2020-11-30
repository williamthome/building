import { UserModel } from '@/data/models'
import { UserModelDto } from '@/data/protocols'

export interface AddUserRepository {
  addUser: (userDto: UserModelDto) => Promise<UserModel>
}