import { UserEntity } from '@/domain/entities/user.entity'
import { EntityDto } from '@/domain/protocols'

export interface AddUserUseCase {
  call: (userDto: EntityDto<UserEntity>) => Promise<UserEntity>
}