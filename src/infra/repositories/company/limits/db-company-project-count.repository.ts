import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel, ProjectModel } from '@/data/models'
import { GetCompanyProjectCountRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('getCompanyProjectCountRepository')
export class DbGetCompanyProjectCountRepository implements GetCompanyProjectCountRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getCompanyProjectCount = async (id: CompanyModel['id']): Promise<number> => {
    return await this.db.getDocumentCountBy<ProjectModel, 'companyId'>('companyId', id, 'projects')
  }
}