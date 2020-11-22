import { CompanyModel } from '@/data/models'
import { GetCompanyByIdRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('getCompanyByIdRepository')
export class DbGetCompanyByIdRepository implements GetCompanyByIdRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getCompanyById = async (id: CompanyModel['id']): Promise<CompanyModel | null> => {
    return await this.db.getOneBy<CompanyModel, CompanyModel['id']>('id', id, 'companies')
  }
}