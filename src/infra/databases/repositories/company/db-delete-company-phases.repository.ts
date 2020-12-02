import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyModel, PhaseModel } from '@/data/models'
import { DeleteCompanyPhasesRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteCompanyPhasesRepository')
export class DbDeleteCompanyPhasesRepository implements DeleteCompanyPhasesRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteCompanyPhases = async (companyId: CompanyModel['id']): Promise<number> => {
    return await this.db.deleteMany<PhaseModel, 'companyId'>('companyId', companyId, 'phases')
  }
}