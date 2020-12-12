import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData, CreateCompanyData } from '@/data/models'
import { AddCompanyRepository } from '@/data/repositories'

@Injectable('addCompanyRepository')
export class DbAddCompanyRepository implements AddCompanyRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  addCompany = async (dto: CreateCompanyData): Promise<CompanyData> => {
    return await this.db.addOne({
      collectionName: 'companies',
      dto,
    })
  }
}