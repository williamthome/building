// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeleteUserRepository, GetUserRightsRepository } from '@/data/repositories'
// < Only Domain
import { User } from '@/domain/entities'
import { DeleteCompanyUseCase, DeleteUserUseCase } from '@/domain/usecases'
import { CompanyRole } from '@/shared/constants'

@Injectable('deleteUserUseCase')
export class DeleteUserContract implements DeleteUserUseCase {
  constructor(
    @Inject()
    private readonly deleteUserRepository: DeleteUserRepository,

    @Inject()
    private readonly getUserRightsRepository: GetUserRightsRepository,

    @Inject()
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase
  ) {}

  call = async (id: User['id']): Promise<User | null> => {
    const user = await this.deleteUserRepository.deleteUser(id)
    if (!user) return null

    const userRights = await this.getUserRightsRepository.getUserRights(id)
    for (const { company, role } of userRights) {
      const ownerCount = company.members.filter((member) => id === member.userId).length
      if (ownerCount === 1 && role === CompanyRole.owner) {
        await this.deleteCompanyUseCase.call(company.id)
      }
    }

    return user
  }
}
