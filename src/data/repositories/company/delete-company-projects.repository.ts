import { CompanyData } from '@/data/models'

export interface DeleteCompanyProjectsRepository {
  deleteCompanyProjects: (id: CompanyData['id']) => Promise<number>
}
