import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData } from '@/data/models'
import { GetCompanyByIdRepository } from '@/data/repositories'

@Injectable('getCompanyByIdRepository')
export class DbGetCompanyByIdRepository implements GetCompanyByIdRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getCompanyById = async (id: CompanyData['id']): Promise<CompanyData | null> => {
    return await this.db.getOne<CompanyData, 'id'>({
      collectionName: 'companies',
      matchKey: 'id',
      matchValue: id
    })
  }
}