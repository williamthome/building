// : Shared
import { Inject, Injectable } from '@/shared/libs/dinjector'
// > Data
import { AddUserRepository } from '@/data/repositories/user'
// < Only Domain
import { UserEntity } from '@/domain/entities'
import { EntityDto } from '@/domain/protocols'
import { AddUserUseCase } from '@/domain/usecases/user'

@Injectable({
  alias: 'addUserUseCase'
})
export class AddUserContract implements AddUserUseCase {

  constructor (
    @Inject({ alias: 'addUserRepository' }) private readonly addUserRepository: AddUserRepository
  ) {}

  call = async (userDto: EntityDto<UserEntity>): Promise<UserEntity> => {
    return await this.addUserRepository.addUser(userDto)
  }
}