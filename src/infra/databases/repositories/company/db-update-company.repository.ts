import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData, UpdateCompanyData } from '@/data/models'
import { UpdateCompanyRepository } from '@/data/repositories'

@Injectable('updateCompanyRepository')
export class DbUpdateCompanyRepository implements UpdateCompanyRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  updateCompany = async (id: CompanyData['id'], dto: UpdateCompanyData): Promise<CompanyData | null> => {
    return await this.db.updateOne<CompanyData, 'id'>({
      collectionName: 'companies',
      matchKey: 'id',
      matchValue: id,
      dto
    })
  }
}