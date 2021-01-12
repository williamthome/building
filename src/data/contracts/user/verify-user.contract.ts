// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeleteUnverifiedRepository, VerifyUserRepository } from '@/data/repositories'
// < Only Domain
import { User } from '@/domain/entities'
import { VerifyUserUseCase } from '@/domain/usecases'

@Injectable('verifyUserUseCase')
export class VerifyUserContract implements VerifyUserUseCase {
  constructor(
    @Inject() private readonly verifyUserRepository: VerifyUserRepository,
    @Inject() private readonly deleteUnverifiedRepository: DeleteUnverifiedRepository
  ) {}

  call = async (id: User['id']): Promise<User | null> => {
    const user = await this.verifyUserRepository.verifyUser(id)
    if (!user) return null

    await this.deleteUnverifiedRepository.deleteUnverified(user.id)

    return user
  }
}
