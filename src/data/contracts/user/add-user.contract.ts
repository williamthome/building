// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddUserRepository } from '@/data/repositories'
import { Hasher } from '@/data/protocols/cryptography'
// < Only Domain
import { UserEntity } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases'
import { UserDto } from '@/domain/protocols'

@Injectable('addUserUseCase')
export class AddUserContract implements AddUserUseCase {

  constructor (
    @Inject() private readonly addUserRepository: AddUserRepository,
    @Inject() private readonly hasher: Hasher
  ) {}

  call = async (userDto: UserDto): Promise<UserEntity> => {
    const hashedPassword = await this.hasher.hash(userDto.password || '')
    return await this.addUserRepository.addUser({
      ...userDto,
      password: hashedPassword
    })
  }
}