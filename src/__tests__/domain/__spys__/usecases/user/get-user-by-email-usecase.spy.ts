import { UserEntity } from '@/domain/entities'
import { GetUserByEmailUseCase } from '@/domain/usecases'
import { mockUserEntity } from '@/__tests__/domain/__mocks__/entities'

export class GetUserByEmailUseCaseSpy implements GetUserByEmailUseCase {
  email?: UserEntity['email']
  userEntity?: UserEntity | null
  override?: Partial<UserEntity>
  shouldReturnNull = false
  shouldThrow = false

  call = async (email: UserEntity['email']): Promise<UserEntity | null> => {
    this.email = email

    if (this.shouldThrow) throw new Error()

    this.userEntity = this.shouldReturnNull
      ? null
      : { ...mockUserEntity(), email, ...this.override }

    return this.userEntity
  }
}