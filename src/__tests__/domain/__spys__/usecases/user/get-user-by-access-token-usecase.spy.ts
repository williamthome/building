import { User } from '@/domain/entities'
import { GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { mockUser } from '@/__tests__/domain/__mocks__/entities'

export class GetUserByAccessTokenUseCaseSpy implements GetUserByAccessTokenUseCase {
  accessToken?: User['accessToken']
  user?: User | null
  override?: Partial<User>
  shouldReturnNull = false
  shouldThrow = false

  call = async (accessToken: User['accessToken']): Promise<User | null> => {
    this.accessToken = accessToken

    if (this.shouldThrow) throw new Error()

    this.user = this.shouldReturnNull ? null : { ...mockUser(), accessToken, ...this.override }

    return this.user
  }
}
