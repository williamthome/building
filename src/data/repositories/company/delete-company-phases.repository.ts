import { CompanyData } from '@/data/models'

export interface DeleteCompanyPhasesRepository {
  deleteCompanyPhases: (id: CompanyData['id']) => Promise<number>
}