import { UserData } from '@/data/models'
import { UpdateUserAccessTokenRepository } from '@/data/repositories'

export class UpdateUserAccessTokenRepositorySpy implements UpdateUserAccessTokenRepository {
  id?: UserData['id']
  accessToken?: UserData['accessToken']
  shouldThrow = false

  updateUserAccessToken = async (
    id: UserData['id'],
    accessToken: UserData['accessToken']
  ): Promise<void> => {
    this.id = id
    this.accessToken = accessToken

    if (this.shouldThrow) throw new Error()
  }
}
