// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateCompanyMemberRepository } from '@/data/repositories'
// < Only Domain
import { Company } from '@/domain/entities'
import { UpdateCompanyMemberUseCase } from '@/domain/usecases'
import { Member, UpdateMemberDto } from '@/domain/entities/nested'

@Injectable('updateCompanyMemberUseCase')
export class UpdateCompanyMemberContract implements UpdateCompanyMemberUseCase {
  constructor(
    @Inject() private readonly updateCompanyMemberRepository: UpdateCompanyMemberRepository
  ) {}

  call = async (
    companyId: Company['id'],
    userId: Member['userId'],
    dto: UpdateMemberDto
  ): Promise<Company | null> => {
    return await this.updateCompanyMemberRepository.updateCompanyMember(companyId, userId, dto)
  }
}
