import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols/model.protocol'
import { AddUserRepository } from '@/data/repositories/user/add-user.repository'
import { mockUserModel } from '../mocks/user-model.mock'

export class AddUserRepositorySpy implements AddUserRepository {
  userDto?:  ModelDto<UserModel>
  userModel?: UserModel
  shouldThrow = false

  addUser = async (userDto: ModelDto<UserModel>): Promise<UserModel> => {
    this.userDto = userDto

    if (this.shouldThrow) throw new Error()

    this.userModel = mockUserModel(userDto)
    return this.userModel
  }
}