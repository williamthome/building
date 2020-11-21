import { UserModel } from '@/data/models'
import { GetUserByEmailRepository } from '@/data/repositories/user'
import { mockUserModel } from '@/__tests__/data/__mocks__/models'

export class GetUserByEmailRepositorySpy implements GetUserByEmailRepository {
  email?: UserModel['email']
  userModel?: UserModel | null
  shouldReturnNull = false
  shouldThrow = false

  getUserByEmail = async (email: UserModel['email']): Promise<UserModel | null> => {
    this.email = email

    if (this.shouldThrow) throw new Error()

    this.userModel = this.shouldReturnNull
      ? null
      : { ...mockUserModel(), email }

    return this.userModel
  }
}