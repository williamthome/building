import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel, ProjectModel } from '@/data/models'
import { DeleteCompanyProjectsRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteCompanyProjectsRepository')
export class DbDeleteCompanyProjectsRepository implements DeleteCompanyProjectsRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteCompanyProjects = async (companyId: CompanyModel['id']): Promise<number> => {
    return await this.db.deleteMany<ProjectModel, 'companyId'>('companyId', companyId, 'projects')
  }
}