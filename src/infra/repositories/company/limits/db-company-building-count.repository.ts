import { Inject, Injectable } from '@/shared/dependency-injection'
import { BuildingModel, CompanyModel } from '@/data/models'
import { GetCompanyBuildingCountRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('getCompanyBuildingCountRepository')
export class DbGetCompanyBuildingCountRepository implements GetCompanyBuildingCountRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getCompanyBuildingCount = async (id: CompanyModel['id']): Promise<number> => {
    return await this.db.getDocumentCountBy<BuildingModel, 'companyId'>('companyId', id, 'buildings')
  }
}