// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateCompanyMemberRepository } from '@/data/repositories'
// < Only Domain
import { CompanyEntity } from '@/domain/entities'
import { UpdateCompanyMemberUseCase } from '@/domain/usecases'
import { MemberEntity } from '@/domain/entities/nested'
import { MemberEntityDto } from '@/domain/protocols'

@Injectable('updateCompanyMemberUseCase')
export class UpdateCompanyMemberContract implements UpdateCompanyMemberUseCase {

  constructor (
    @Inject() private readonly updateCompanyMemberRepository: UpdateCompanyMemberRepository
  ) {}

  call = async (companyId: CompanyEntity['id'], memberId: MemberEntity['userId'], memberDto: MemberEntityDto): Promise<CompanyEntity | null> => {
    return await this.updateCompanyMemberRepository.updateCompanyMember(companyId, memberId, memberDto)
  }
}