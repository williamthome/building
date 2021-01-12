import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData } from '@/data/models'
import { RemoveCompanyMemberRepository } from '@/data/repositories'
import { MemberData } from '@/data/models/nested'

@Injectable('removeCompanyMemberRepository')
export class DbRemoveCompanyMemberRepository implements RemoveCompanyMemberRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  removeCompanyMember = async (
    companyId: CompanyData['id'],
    userId: MemberData['userId']
  ): Promise<CompanyData | null> => {
    return await this.db.pullOne<CompanyData, 'id', 'members'>({
      collectionName: 'companies',
      matchKey: 'id',
      matchValue: companyId,
      arrayKey: 'members',
      arrayMatchValue: { userId }
    })
  }
}
