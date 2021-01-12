// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddCompanyMemberRepository } from '@/data/repositories'
// < Only Domain
import { Company } from '@/domain/entities'
import { AddCompanyMemberUseCase } from '@/domain/usecases'
import { CreateMemberDto } from '@/domain/entities/nested'

@Injectable('addCompanyMemberUseCase')
export class AddCompanyMemberContract implements AddCompanyMemberUseCase {
  constructor(@Inject() private readonly addCompanyMemberRepository: AddCompanyMemberRepository) {}

  call = async (companyId: Company['id'], dto: CreateMemberDto): Promise<Company | null> => {
    return await this.addCompanyMemberRepository.addCompanyMember(companyId, dto)
  }
}
