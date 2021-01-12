import fakeData from '@/__tests__/shared/fake-data'
import { CreateUserDto } from '@/domain/entities'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { UserVerificationTokenResponse } from '@/domain/protocols'
import { AddUserUseCase } from '@/domain/usecases'
import { mockUser } from '@/__tests__/domain/__mocks__/entities'

export class AddUserUseCaseSpy implements AddUserUseCase {
  dto?: CreateUserDto
  userVerificationToken?: UserVerificationTokenResponse
  shouldThrow = false

  call = async (dto: CreateUserDto): Promise<UserVerificationTokenResponse> => {
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    const user = mockUser(dto)

    this.userVerificationToken = {
      user: userWithoutPassword(user),
      verificationToken: fakeData.entity.token(user.id)
    }

    return this.userVerificationToken
  }
}
