// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddCompanyRepository } from '@/data/repositories'
// < Only Domain
import { Company, CreateCompanyDto, User } from '@/domain/entities'
import { AddCompanyUseCase } from '@/domain/usecases'
import { CompanyRole, UserFeatures } from '@/shared/constants'

@Injectable('addCompanyUseCase')
export class AddCompanyContract implements AddCompanyUseCase {
  constructor(@Inject() private readonly addCompanyRepository: AddCompanyRepository) {}

  call = async (dto: CreateCompanyDto, loggedUserId: User['id']): Promise<Company> => {
    return await this.addCompanyRepository.addCompany({
      ...dto,
      members: [
        {
          userId: loggedUserId,
          companyRole: CompanyRole.owner,
          features: UserFeatures.None
        }
      ]
    })
  }
}
