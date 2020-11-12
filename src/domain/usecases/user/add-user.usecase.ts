import { UserEntity } from '@/domain/entities'
import { UserDto } from '@/domain/protocols'

export interface AddUserUseCase {
  call: (userDto: UserDto) => Promise<UserEntity>
}