import { UserModel } from '@/data/models'
import { UpdateUserAccessTokenRepository } from '@/data/repositories'

export class UpdateUserAccessTokenRepositorySpy implements UpdateUserAccessTokenRepository {
  id?: UserModel['id']
  accessToken?:  UserModel['accessToken']
  shouldThrow = false

  updateUserAccessToken = async (
    id: UserModel['id'],
    accessToken: UserModel['accessToken']
  ): Promise<void> => {
    this.id = id
    this.accessToken = accessToken

    if (this.shouldThrow) throw new Error()
  }
}