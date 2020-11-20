import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols'
import { CompanyModel } from '@/data/models'
import { AddCompanyRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('addCompanyRepository')
export class DbAddCompanyRepository implements AddCompanyRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addCompany = async (companyDto: ModelDto<CompanyModel>): Promise<CompanyModel> => {
    return await this.db.addOne<CompanyModel>(companyDto, 'companies')
  }
}