// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { UpdateUserActiveCompanyRepository } from '@/data/repositories/user'
// < Only Domain
import { UpdateUserActiveCompanyUseCase } from '@/domain/usecases/user'
import { UserEntity } from '@/domain/entities'

@Injectable('updateUserActiveCompanyUseCase')
export class UpdateUserActiveCompanyContract implements UpdateUserActiveCompanyUseCase {

  constructor (
    @Inject() private readonly updateUserActiveCompanyRepository: UpdateUserActiveCompanyRepository
  ) { }

  call = async (id: UserEntity['id'], activeCompanyId: UserEntity['activeCompanyId']): Promise<void> => {
    await this.updateUserActiveCompanyRepository.updateUserActiveCompany(id, activeCompanyId)
  }
}