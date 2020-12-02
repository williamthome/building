import { Inject, Injectable } from '@/shared/dependency-injection'
import { TechnicianModel, CompanyModel } from '@/data/models'
import { GetCompanyTechnicianCountRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('getCompanyTechnicianCountRepository')
export class DbGetCompanyTechnicianCountRepository implements GetCompanyTechnicianCountRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getCompanyTechnicianCount = async (id: CompanyModel['id']): Promise<number> => {
    return await this.db.getDocumentCountBy<TechnicianModel, 'companyId'>('companyId', id, 'technicians')
  }
}