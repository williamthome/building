import { UserEntity } from '@/domain/entities'
import { UserDto } from '@/domain/protocols'

export interface UpdateUserUseCase {
  call: (userId: UserEntity['id'], userDto: UserDto) => Promise<UserEntity | null>
}