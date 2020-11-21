import { UserEntity } from '@/domain/entities'
import { UpdateUserAccessTokenUseCase } from '@/domain/usecases'

export class UpdateUserAccessTokenUseCaseSpy implements UpdateUserAccessTokenUseCase {
  id?: UserEntity['id']
  accessToken?:  UserEntity['accessToken']
  shouldThrow = false

  call = async (
    id: UserEntity['id'],
    accessToken: UserEntity['accessToken']
  ): Promise<void> => {
    this.id = id
    this.accessToken = accessToken

    if (this.shouldThrow) throw new Error()
  }
}