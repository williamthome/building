import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel, PhaseModel } from '@/data/models'
import { GetCompanyPhaseCountRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('getCompanyPhaseCountRepository')
export class DbGetCompanyPhaseCountRepository implements GetCompanyPhaseCountRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getCompanyPhaseCount = async (id: CompanyModel['id']): Promise<number> => {
    return await this.db.getDocumentCountBy<PhaseModel, 'companyId'>('companyId', id, 'phases')
  }
}