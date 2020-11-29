import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel } from '@/data/models'
import { GetCompanyMemberCountRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('getCompanyMemberCountRepository')
export class DbGetCompanyMemberCountRepository implements GetCompanyMemberCountRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getCompanyMemberCount = async (id: CompanyModel['id']): Promise<number> => {
    const company = await this.db.getOneBy<CompanyModel, CompanyModel['id']>('id', id, 'companies')
    return company ? company.members.length : 0
  }
}