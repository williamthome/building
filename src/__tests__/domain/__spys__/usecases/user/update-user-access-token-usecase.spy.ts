import { User } from '@/domain/entities'
import { UpdateUserAccessTokenUseCase } from '@/domain/usecases'

export class UpdateUserAccessTokenUseCaseSpy implements UpdateUserAccessTokenUseCase {
  id?: User['id']
  accessToken?: User['accessToken']
  shouldThrow = false

  call = async (id: User['id'], accessToken: User['accessToken']): Promise<void> => {
    this.id = id
    this.accessToken = accessToken

    if (this.shouldThrow) throw new Error()
  }
}
