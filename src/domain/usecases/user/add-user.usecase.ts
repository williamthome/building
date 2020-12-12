import { CreateUserDto } from '@/domain/entities'
import { UserVerificationTokenResponse } from '@/domain/protocols'

export interface AddUserUseCase {
  call: (dto: CreateUserDto) => Promise<UserVerificationTokenResponse>
}