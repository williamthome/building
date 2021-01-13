import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { BuildingData, CompanyData } from '@/data/models'
import { GetCompanyBuildingsRepository } from '@/data/repositories'

@Injectable('getCompanyBuildingsRepository')
export class DbGetCompanyBuildingsRepository implements GetCompanyBuildingsRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getCompanyBuildings = async (id: CompanyData['id']): Promise<BuildingData[]> => {
    return await this.db.getMany<BuildingData, 'companyId'>({
      collectionName: 'buildings',
      matchKey: 'companyId',
      matchValue: id
    })
  }
}
