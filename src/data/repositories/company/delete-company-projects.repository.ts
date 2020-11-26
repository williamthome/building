import { CompanyModel } from '@/data/models'

export interface DeleteCompanyProjectsRepository {
  deleteCompanyProjects: (companyId: CompanyModel['id']) => Promise<number>
}