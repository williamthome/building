import { UserData } from '@/data/models'
import { GetUserByEmailRepository } from '@/data/repositories'
import { mockUserData } from '@/__tests__/data/__mocks__/models'

export class GetUserByEmailRepositorySpy implements GetUserByEmailRepository {
  email?: UserData['email']
  user?: UserData | null
  shouldReturnNull = false
  shouldThrow = false

  getUserByEmail = async (email: UserData['email']): Promise<UserData | null> => {
    this.email = email

    if (this.shouldThrow) throw new Error()

    this.user = this.shouldReturnNull ? null : { ...mockUserData(), email }

    return this.user
  }
}
