import { Inject, Injectable } from '@/shared/dependency-injection'
import { PropertyModel, CompanyModel } from '@/data/models'
import { GetCompanyPropertyCountRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('getCompanyPropertyCountRepository')
export class DbGetCompanyPropertyCountRepository implements GetCompanyPropertyCountRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getCompanyPropertyCount = async (id: CompanyModel['id']): Promise<number> => {
    return await this.db.getDocumentCountBy<PropertyModel, 'companyId'>('companyId', id, 'properties')
  }
}