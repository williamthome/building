import { UserData } from '@/data/models'
import { GetUserByAccessTokenRepository } from '@/data/repositories'
import { mockUserData } from '@/__tests__/data/__mocks__/models'

export class GetUserByAccessTokenRepositorySpy implements GetUserByAccessTokenRepository {
  accessToken?: UserData['accessToken']
  user?: UserData | null
  shouldReturnNull = false
  shouldThrow = false

  getUserByAccessToken = async (accessToken: UserData['accessToken']): Promise<UserData | null> => {
    this.accessToken = accessToken

    if (this.shouldThrow) throw new Error()

    this.user = this.shouldReturnNull
      ? null
      : { ...mockUserData(), accessToken }

    return this.user
  }
}