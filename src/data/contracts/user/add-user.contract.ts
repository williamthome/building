// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddUserRepository, AddUnverifiedRepository } from '@/data/repositories'
import { Hasher } from '@/data/protocols/cryptography'
// < Only Domain
import { UserEntity } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases'
import { UserDto } from '@/domain/protocols'

@Injectable('addUserUseCase')
export class AddUserContract implements AddUserUseCase {

  constructor (
    @Inject() private readonly hasher: Hasher,
    @Inject() private readonly addUserRepository: AddUserRepository,
    @Inject() private readonly addUnverifiedRepository: AddUnverifiedRepository
  ) {}

  call = async (userDto: UserDto): Promise<UserEntity> => {
    const hashedPassword = await this.hasher.hash(userDto.password as UserEntity['password'])
    const user = await this.addUserRepository.addUser({
      ...userDto,
      password: hashedPassword,
      verified: false
    })

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const verificationToken = await this.hasher.hash(user.id)

    await this.addUnverifiedRepository.addUnverified({
      token: verificationToken,
      expiresIn: tomorrow.getTime()
    })

    return user
  }
}