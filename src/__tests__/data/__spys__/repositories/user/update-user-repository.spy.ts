import { UserModel } from '@/data/models'
import { UserModelDto } from '@/data/protocols'
import { UpdateUserRepository } from '@/data/repositories'
import { mockUserModel } from '@/__tests__/data/__mocks__/models'

export class UpdateUserRepositorySpy implements UpdateUserRepository {
  userId?: UserModel['id']
  userDto?:  UserModelDto
  userModel?: UserModel | null
  shouldReturnNull = false
  shouldThrow = false

  updateUser = async (
    userId: UserModel['id'],
    userDto: UserModelDto
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