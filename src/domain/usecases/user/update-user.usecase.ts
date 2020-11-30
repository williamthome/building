import { UserEntity } from '@/domain/entities'
import { UserEntityDto } from '@/domain/protocols'

export interface UpdateUserUseCase {
  call: (userId: UserEntity['id'], userDto: UserEntityDto) => Promise<UserEntity | null>
}