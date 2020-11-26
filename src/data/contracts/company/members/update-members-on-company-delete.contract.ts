// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetUserByIdRepository } from '@/data/repositories'
// < Only Domain
import { CompanyEntity } from '@/domain/entities'
import { UpdateMembersOnCompanyDeleteUseCase, UpdateUserActiveCompanyUseCase } from '@/domain/usecases'

@Injectable('updateMembersOnCompanyDeleteUseCase')
export class UpdateMembersOnCompanyDeleteContract implements UpdateMembersOnCompanyDeleteUseCase {

  constructor (
    @Inject() private readonly getUserByIdRepository: GetUserByIdRepository,
    @Inject() private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase
  ) {}

  call = async (company: CompanyEntity): Promise<void> => {
    for (const { userId } of company.members) {
      const user = await this.getUserByIdRepository.getUserById(userId)
      if (!user) continue

      if (user.activeCompanyId === company.id)
        await this.updateUserActiveCompanyUseCase.call(userId, undefined)
    }
  }
}