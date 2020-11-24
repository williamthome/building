// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { RemoveCompanyMemberRepository } from '@/data/repositories'
// < Only Domain
import { CompanyEntity, UserEntity } from '@/domain/entities'
import { RemoveCompanyMemberUseCase } from '@/domain/usecases'

@Injectable('removeCompanyMemberUseCase')
export class RemoveCompanyMemberContract implements RemoveCompanyMemberUseCase {

  constructor (
    @Inject() private readonly removeCompanyMemberRepository: RemoveCompanyMemberRepository
  ) {}

  call = async (companyId: CompanyEntity['id'], userId: UserEntity['id']): Promise<CompanyEntity | null> => {
    return await this.removeCompanyMemberRepository.removeCompanyMember(companyId, userId)
  }
}