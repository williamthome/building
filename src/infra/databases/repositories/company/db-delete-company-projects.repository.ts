import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData, ProjectData } from '@/data/models'
import { DeleteCompanyProjectsRepository } from '@/data/repositories'

@Injectable('deleteCompanyProjectsRepository')
export class DbDeleteCompanyProjectsRepository implements DeleteCompanyProjectsRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  deleteCompanyProjects = async (id: CompanyData['id']): Promise<number> => {
    return await this.db.deleteMany<ProjectData, 'companyId'>({
      collectionName: 'projects',
      matchKey: 'companyId',
      matchValue: id
    })
  }
}