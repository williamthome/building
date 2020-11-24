import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel } from '@/data/models'
import { UpdateCompanyMemberRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

// !! MOVE TO DATA LAYER !!
import { Member } from '@/domain/entities/nested'
import { MemberDto } from '@/domain/protocols'

@Injectable('updateCompanyMemberRepository')
export class DbUpdateCompanyMemberRepository implements UpdateCompanyMemberRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  updateCompanyMember = async (
    companyId: CompanyModel['id'],
    memberId: Member['userId'],
    memberDto: MemberDto
  ): Promise<CompanyModel | null> => {
    return await this.db.setOne<CompanyModel, 'members', 'userId'>(
      companyId,
      'members',
      'userId',
      memberId,
      memberDto,
      'companies'
    )
  }
}