import { AddUserResponse, UserDto } from '@/domain/protocols'

export interface AddUserUseCase {
  call: (userDto: UserDto) => Promise<AddUserResponse>
}