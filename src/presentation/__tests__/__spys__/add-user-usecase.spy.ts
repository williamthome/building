import { UserEntity } from '@/domain/entities'
import { EntityDto } from '@/domain/protocols'
import { AddUserUseCase } from '@/domain/usecases/user'
import { mockUserEntity } from '../__mocks__/user-entity.mock'

export class AddUserUseCaseSpy implements AddUserUseCase {
  userDto?:  EntityDto<UserEntity>
  userEntity?: UserEntity
  shouldThrow = false

  call = async (userDto: EntityDto<UserEntity>): Promise<UserEntity> => {
    this.userDto = userDto

    if (this.shouldThrow) throw new Error()

    this.userEntity = mockUserEntity(userDto)
    return this.userEntity
  }
}