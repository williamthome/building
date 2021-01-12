import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData } from '@/data/models'
import { UpdateCompanyMemberRepository } from '@/data/repositories'
import { MemberData, UpdateMemberData } from '@/data/models/nested'

@Injectable('updateCompanyMemberRepository')
export class DbUpdateCompanyMemberRepository implements UpdateCompanyMemberRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  updateCompanyMember = async (
    companyId: CompanyData['id'],
    userId: MemberData['userId'],
    dto: UpdateMemberData
  ): Promise<CompanyData | null> => {
    return await this.db.setOne<CompanyData, 'id', 'members', 'userId'>({
      collectionName: 'companies',
      matchKey: 'id',
      matchValue: companyId,
      arrayKey: 'members',
      arrayMatchKey: 'userId',
      arrayMatchValue: userId,
      dto
    })
  }
}
