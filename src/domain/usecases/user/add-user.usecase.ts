import { UseCase } from '@/domain/core/usecases.core'
import { UserEntity } from '@/domain/entities/user.entity'
import { UserRepository } from '@/domain/repositories/user.repository'
import { Response } from '@/shared/responses'

export class AddUserUseCase implements UseCase<UserEntity> {
  constructor (private readonly userRepository: UserRepository) {}

  call = async (userDto: Partial<UserEntity>): Response<UserEntity> => {
    return await this.userRepository.addUser(userDto)
  }
}