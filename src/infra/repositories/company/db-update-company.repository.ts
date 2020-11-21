import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols'
import { CompanyModel } from '@/data/models'
import { UpdateCompanyRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('updateCompanyRepository')
export class DbUpdateCompanyRepository implements UpdateCompanyRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateCompany = async (
    companyId: CompanyModel['id'],
    companyDto: ModelDto<CompanyModel>
  ): Promise<CompanyModel | null> => {
    return await this.db.updateOne<CompanyModel>(companyId, companyDto, 'companies')
  }
}