import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData, BuildingData } from '@/data/models'
import { DeleteCompanyBuildingsRepository } from '@/data/repositories'

@Injectable('deleteCompanyBuildingsRepository')
export class DbDeleteCompanyBuildingsRepository implements DeleteCompanyBuildingsRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  deleteCompanyBuildings = async (id: CompanyData['id']): Promise<number> => {
    return await this.db.deleteMany<BuildingData, 'companyId'>({
      collectionName: 'buildings',
      matchKey: 'companyId',
      matchValue: id
    })
  }
}
