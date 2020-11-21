import { UserModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'
import { UpdateUserRepository } from '@/data/repositories'
import { mockUserModel } from '@/__tests__/data/__mocks__/models'

export class UpdateUserRepositorySpy implements UpdateUserRepository {
  userId?: UserModel['id']
  userDto?:  ModelDto<UserModel>
  userModel?: UserModel | null
  shouldReturnNull = false
  shouldThrow = false

  updateUser = async (
    userId: UserModel['id'],
    userDto: ModelDto<UserModel>
  ): Promise<UserModel | null> => {
    this.userId = userId
    this.userDto = userDto

    if (this.shouldThrow) throw new Error()

    this.userModel = this.shouldReturnNull
      ? null
      : mockUserModel(userDto)

    return this.userModel
  }
}