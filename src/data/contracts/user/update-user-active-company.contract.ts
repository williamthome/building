// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { UpdateUserActiveCompanyRepository } from '@/data/repositories'
// < Only Domain
import { UpdateUserActiveCompanyUseCase } from '@/domain/usecases'
import { User } from '@/domain/entities'

@Injectable('updateUserActiveCompanyUseCase')
export class UpdateUserActiveCompanyContract implements UpdateUserActiveCompanyUseCase {
  constructor(
    @Inject() private readonly updateUserActiveCompanyRepository: UpdateUserActiveCompanyRepository
  ) {}

  call = async (id: User['id'], activeCompanyId: User['activeCompanyId']): Promise<void> => {
    await this.updateUserActiveCompanyRepository.updateUserActiveCompany(id, activeCompanyId)
  }
}
