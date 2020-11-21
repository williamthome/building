import { UserEntity } from '@/domain/entities'
import { UserDto } from '@/domain/protocols'
import { UpdateUserUseCase } from '@/domain/usecases'
import { mockUserEntity } from '@/__tests__/domain/__mocks__/entities'

export class UpdateUserUseCaseSpy implements UpdateUserUseCase {
  userId?: UserEntity['id']
  userDto?:  UserDto
  userEntity?: UserEntity | null
  shouldReturnNull = false
  shouldThrow = false

  call = async (
    userId: UserEntity['id'],
    userDto: UserDto
  ): Promise<UserEntity | null> => {
    this.userId = userId
    this.userDto = userDto

    if (this.shouldThrow) throw new Error()

    this.userEntity = this.shouldReturnNull
      ? null
      : mockUserEntity(userDto)

    return this.userEntity
  }
}