// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddUserRepository, AddUnverifiedRepository } from '@/data/repositories'
import { Encrypter, Hasher } from '@/data/protocols/cryptography'
// < Only Domain
import { UserEntity } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases'
import { AddUserResponse, UserDto } from '@/domain/protocols'

@Injectable('addUserUseCase')
export class AddUserContract implements AddUserUseCase {

  constructor (
    @Inject() private readonly hasher: Hasher,
    @Inject() private readonly addUserRepository: AddUserRepository,
    @Inject() private readonly addUnverifiedRepository: AddUnverifiedRepository,
    @Inject() private readonly encrypter: Encrypter
  ) {}

  call = async (userDto: UserDto): Promise<AddUserResponse> => {
    const hashedPassword = await this.hasher.hash(userDto.password as UserEntity['password'])
    const user = await this.addUserRepository.addUser({
      ...userDto,
      password: hashedPassword,
      verified: false
    })

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    await this.addUnverifiedRepository.addUnverified({
      userId: user.id,
      expiresIn: tomorrow.getTime()
    })

    const verificationToken = await this.encrypter.encrypt(user.id)

    return { user, verificationToken }
  }
}