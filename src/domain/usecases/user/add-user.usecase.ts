import { UserEntity } from '@/domain/entities/user.entity'
import { AddUserDto } from '@/domain/protocols'

export interface AddUserUseCase {
  call: (userDto: AddUserDto) => Promise<UserEntity>
}