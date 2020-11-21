import { UserModel } from '@/data/models'
import { GetUserByAccessTokenRepository } from '@/data/repositories'
import { mockUserModel } from '@/__tests__/data/__mocks__/models'

export class GetUserByAccessTokenRepositorySpy implements GetUserByAccessTokenRepository {
  accessToken?: UserModel['accessToken']
  userModel?: UserModel | null
  shouldReturnNull = false
  shouldThrow = false

  getUserByAccessToken = async (accessToken: UserModel['accessToken']): Promise<UserModel | null> => {
    this.accessToken = accessToken

    if (this.shouldThrow) throw new Error()

    this.userModel = this.shouldReturnNull
      ? null
      : { ...mockUserModel(), accessToken }

    return this.userModel
  }
}