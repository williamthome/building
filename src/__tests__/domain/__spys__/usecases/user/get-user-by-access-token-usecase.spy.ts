import { UserEntity } from '@/domain/entities'
import { GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { mockUserEntity } from '@/__tests__/domain/__mocks__/entities'

export class GetUserByAccessTokenUseCaseSpy implements GetUserByAccessTokenUseCase {
  accessToken?: UserEntity['accessToken']
  userModel?: UserEntity | null
  shouldReturnNull = false
  shouldThrow = false

  call = async (accessToken: UserEntity['accessToken']): Promise<UserEntity | null> => {
    this.accessToken = accessToken

    if (this.shouldThrow) throw new Error()

    this.userModel = this.shouldReturnNull
      ? null
      : { ...mockUserEntity(), accessToken }

    return this.userModel
  }
}