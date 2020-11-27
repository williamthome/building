import { UserEntity } from '@/domain/entities'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { UserVerificationToken } from '@/domain/protocols'
import { AddUserUseCase } from '@/domain/usecases'
import { mockUserEntity } from '@/__tests__/domain/__mocks__/entities'
import fakeData from '@/__tests__/shared/fake-data'

export class AddUserUseCaseSpy implements AddUserUseCase {
  userDto?: Partial<Omit<UserEntity, 'id'>>
  userVerificationToken?: UserVerificationToken
  shouldThrow = false

  call = async (userDto: Partial<Omit<UserEntity, 'id'>>): Promise<UserVerificationToken> => {
    this.userDto = userDto

    if (this.shouldThrow) throw new Error()

    const user = mockUserEntity(userDto)

    this.userVerificationToken = {
      user: userWithoutPassword(user),
      verificationToken: fakeData.entity.token(user.id)
    }

    return this.userVerificationToken
  }
}