import { UserVerificationToken, UserEntityDto } from '@/domain/protocols'

export interface AddUserUseCase {
  call: (userDto: UserEntityDto) => Promise<UserVerificationToken>
}