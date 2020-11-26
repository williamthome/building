// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeleteUserRepository, GetUserRightsRepository } from '@/data/repositories'
// < Only Domain
import { UserEntity } from '@/domain/entities'
import { DeleteCompanyUseCase, DeleteUserUseCase } from '@/domain/usecases'
import { CompanyRole } from '@/shared/constants'

@Injectable('deleteUserUseCase')
export class DeleteUserContract implements DeleteUserUseCase {

  constructor (
    @Inject()
    private readonly deleteUserRepository: DeleteUserRepository,

    @Inject()
    private readonly getUserRightsRepository: GetUserRightsRepository,

    @Inject()
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase
  ) {}

  call = async (userId: UserEntity['id']): Promise<UserEntity | null> => {
    const user = await this.deleteUserRepository.deleteUser(userId)
    if (!user) return null

    const userRights = await this.getUserRightsRepository.getUserRights(userId)
    for (const { company, rights } of userRights) {
      const ownerCount = company.members.filter(member => userId === member.userId).length
      if (ownerCount === 1 && rights.companyRole === CompanyRole.owner) {
        await this.deleteCompanyUseCase.call(company.id)
      }
    }

    return user
  }
}