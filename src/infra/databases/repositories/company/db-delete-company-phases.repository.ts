import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CompanyData, PhaseData } from '@/data/models'
import { DeleteCompanyPhasesRepository } from '@/data/repositories'

@Injectable('deleteCompanyPhasesRepository')
export class DbDeleteCompanyPhasesRepository implements DeleteCompanyPhasesRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  deleteCompanyPhases = async (id: CompanyData['id']): Promise<number> => {
    return await this.db.deleteMany<PhaseData, 'companyId'>({
      collectionName: 'phases',
      matchKey: 'companyId',
      matchValue: id
    })
  }
}
