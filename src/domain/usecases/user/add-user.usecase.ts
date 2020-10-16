import { UserEntity } from '@/domain/entities/user.entity'

export interface AddUserUseCase {
  call: (userDto: Partial<UserEntity>) => Promise<UserEntity>
}