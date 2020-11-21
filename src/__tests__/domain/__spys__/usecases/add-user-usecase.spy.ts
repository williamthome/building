import { UserEntity } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases'
import { mockUserEntity } from '@/__tests__/domain/__mocks__/entities'

export class AddUserUseCaseSpy implements AddUserUseCase {
  userDto?: Partial<Omit<UserEntity, 'id'>>
  userEntity?: UserEntity
  shouldThrow = false

  call = async (userDto: Partial<Omit<UserEntity, 'id'>>): Promise<UserEntity> => {
    this.userDto = userDto

    if (this.shouldThrow) throw new Error()

    this.userEntity = mockUserEntity(userDto)
    return this.userEntity
  }
}