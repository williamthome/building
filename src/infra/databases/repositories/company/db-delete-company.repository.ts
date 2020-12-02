import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel } from '@/data/models'
import { DeleteCompanyRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteCompanyRepository')
export class DbDeleteCompanyRepository implements DeleteCompanyRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteCompany = async (companyId: CompanyModel['id']): Promise<CompanyModel | null> => {
    return await this.db.deleteOne<CompanyModel>(companyId, 'companies')
  }
}