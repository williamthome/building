import { CompanyModel } from '@/data/models'

export interface GetCompanyTechnicianCountRepository {
  getCompanyTechnicianCount: (id: CompanyModel['id']) => Promise<number>
}