import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel, UserModel } from '@/data/models'
import { RemoveCompanyMemberRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('removeCompanyMemberRepository')
export class DbRemoveCompanyMemberRepository implements RemoveCompanyMemberRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  removeCompanyMember = async (companyId: CompanyModel['id'], userId: UserModel['id']): Promise<CompanyModel | null> => {
    return await this.db.pullOne<CompanyModel, 'members'>(companyId, 'members', { userId }, 'companies')
  }
}