import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData } from '@/data/models'
import { DeleteCompanyRepository } from '@/data/repositories'

@Injectable('deleteCompanyRepository')
export class DbDeleteCompanyRepository implements DeleteCompanyRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  deleteCompany = async (id: CompanyData['id']): Promise<CompanyData | null> => {
    return await this.db.deleteOne<CompanyData, 'id'>({
      collectionName: 'companies',
      matchKey: 'id',
      matchValue: id
    })
  }
}