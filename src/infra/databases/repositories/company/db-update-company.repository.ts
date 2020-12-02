import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel } from '@/data/models'
import { UpdateCompanyRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { CompanyModelDto } from '@/data/protocols'

@Injectable('updateCompanyRepository')
export class DbUpdateCompanyRepository implements UpdateCompanyRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateCompany = async (
    companyId: CompanyModel['id'],
    companyDto: CompanyModelDto
  ): Promise<CompanyModel | null> => {
    return await this.db.updateOne<CompanyModel>(companyId, companyDto, 'companies')
  }
}