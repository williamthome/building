import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel, BuildingModel } from '@/data/models'
import { DeleteCompanyBuildingsRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteCompanyBuildingsRepository')
export class DbDeleteCompanyBuildingsRepository implements DeleteCompanyBuildingsRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteCompanyBuildings = async (companyId: CompanyModel['id']): Promise<number> => {
    return await this.db.deleteMany<BuildingModel, 'companyId'>('companyId', companyId, 'buildings')
  }
}