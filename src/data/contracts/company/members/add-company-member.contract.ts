// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddCompanyMemberRepository } from '@/data/repositories'
// < Only Domain
import { CompanyEntity } from '@/domain/entities'
import { AddCompanyMemberUseCase } from '@/domain/usecases'
import { MemberEntity } from '@/domain/entities/nested'

@Injectable('addCompanyMemberUseCase')
export class AddCompanyMemberContract implements AddCompanyMemberUseCase {

  constructor (
    @Inject() private readonly addCompanyMemberRepository: AddCompanyMemberRepository
  ) {}

  call = async (companyId: CompanyEntity['id'], member: MemberEntity): Promise<CompanyEntity | null> => {
    return await this.addCompanyMemberRepository.addCompanyMember(companyId, member)
  }
}