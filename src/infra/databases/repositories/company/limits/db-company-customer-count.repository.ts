import { Inject, Injectable } from '@/shared/dependency-injection'
import { CustomerModel, CompanyModel } from '@/data/models'
import { GetCompanyCustomerCountRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('getCompanyCustomerCountRepository')
export class DbGetCompanyCustomerCountRepository implements GetCompanyCustomerCountRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getCompanyCustomerCount = async (id: CompanyModel['id']): Promise<number> => {
    return await this.db.getDocumentCountBy<CustomerModel, 'companyId'>('companyId', id, 'companies')
  }
}