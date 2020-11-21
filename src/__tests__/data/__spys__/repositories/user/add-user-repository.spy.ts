import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'
import { AddUserRepository } from '@/data/repositories'
import { mockUserModel } from '@/__tests__/data/__mocks__/models'

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