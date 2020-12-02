import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel } from '@/data/models'
import { AddCompanyRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { CompanyModelDto } from '@/data/protocols'

@Injectable('addCompanyRepository')
export class DbAddCompanyRepository implements AddCompanyRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addCompany = async (companyDto: CompanyModelDto): Promise<CompanyModel> => {
    return await this.db.addOne<CompanyModel>(companyDto, 'companies')
  }
}