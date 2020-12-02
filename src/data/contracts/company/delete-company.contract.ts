// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import {
  DeleteCompanyRepository,
  DeleteCompanyProjectsRepository,
  DeleteCompanyBuildingsRepository,
  GetUserByIdRepository,
  UpdateUserActiveCompanyRepository,
  DeleteCompanyPhasesRepository
} from '@/data/repositories'
// < Only Domain
import { CompanyEntity } from '@/domain/entities'
import { DeleteCompanyUseCase } from '@/domain/usecases'

@Injectable('deleteCompanyUseCase')
export class DeleteCompanyContract implements DeleteCompanyUseCase {

  constructor (
    @Inject()
    private readonly deleteCompanyRepository: DeleteCompanyRepository,

    @Inject()
    private readonly deleteCompanyProjectsRepository: DeleteCompanyProjectsRepository,

    @Inject()
    private readonly deleteCompanyPhasesRepository: DeleteCompanyPhasesRepository,

    @Inject()
    private readonly deleteCompanyBuildingsRepository: DeleteCompanyBuildingsRepository,

    @Inject()
    private readonly getUserByIdRepository: GetUserByIdRepository,

    @Inject()
    private readonly updateUserActiveCompanyRepository: UpdateUserActiveCompanyRepository
  ) { }

  call = async (companyId: CompanyEntity['id']): Promise<CompanyEntity | null> => {
    const company = await this.deleteCompanyRepository.deleteCompany(companyId)
    if (!company) return null

    await this.deleteCompanyProjectsRepository.deleteCompanyProjects(companyId)
    await this.deleteCompanyPhasesRepository.deleteCompanyPhases(companyId)
    await this.deleteCompanyBuildingsRepository.deleteCompanyBuildings(companyId)

    for (const { userId } of company.members) {
      const user = await this.getUserByIdRepository.getUserById(userId)
      if (!user) continue

      if (user.activeCompanyId === company.id)
        await this.updateUserActiveCompanyRepository.updateUserActiveCompany(userId, undefined)
    }

    return company
  }
}