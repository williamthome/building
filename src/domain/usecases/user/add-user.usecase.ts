import { UserEntity } from '@/domain/entities/user.entity'

export interface AddUserUseCase {
  call: (userDto: Partial<Omit<UserEntity, 'id'>>) => Promise<UserEntity>
}