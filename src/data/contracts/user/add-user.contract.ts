// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddUserRepository, AddUnverifiedRepository } from '@/data/repositories'
import { Hasher } from '@/data/protocols/cryptography'
// < Only Domain
import { CreateUserDto } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases'
import { UserVerificationTokenResponse } from '@/domain/protocols'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { Encrypter } from '@/domain/protocols/cryptography'

@Injectable('addUserUseCase')
export class AddUserContract implements AddUserUseCase {

  constructor (
    @Inject() private readonly hasher: Hasher,
    @Inject() private readonly addUserRepository: AddUserRepository,
    @Inject() private readonly addUnverifiedRepository: AddUnverifiedRepository,
    @Inject() private readonly encrypter: Encrypter
  ) { }

  call = async (dto: CreateUserDto): Promise<UserVerificationTokenResponse> => {
    const hashedPassword = await this.hasher.hash(dto.password)
    const user = await this.addUserRepository.addUser({
      email: dto.email,
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

    return {
      user: userWithoutPassword(user),
      verificationToken
    }
  }
}