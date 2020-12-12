// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { RemoveCompanyMemberRepository } from '@/data/repositories'
// < Only Domain
import { Company } from '@/domain/entities'
import { RemoveCompanyMemberUseCase } from '@/domain/usecases'
import { Member } from '@/domain/entities/nested'

@Injectable('removeCompanyMemberUseCase')
export class RemoveCompanyMemberContract implements RemoveCompanyMemberUseCase {

  constructor (
    @Inject() private readonly removeCompanyMemberRepository: RemoveCompanyMemberRepository
  ) {}

  call = async (companyId: Company['id'], userId: Member['userId']): Promise<Company | null> => {
    return await this.removeCompanyMemberRepository.removeCompanyMember(companyId, userId)
  }
}