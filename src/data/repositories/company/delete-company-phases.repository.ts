import { CompanyModel } from '@/data/models'

export interface DeleteCompanyPhasesRepository {
  deleteCompanyPhases: (companyId: CompanyModel['id']) => Promise<number>
}