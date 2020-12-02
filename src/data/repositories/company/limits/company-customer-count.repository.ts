import { CompanyModel } from '@/data/models'

export interface GetCompanyCustomerCountRepository {
  getCompanyCustomerCount: (id: CompanyModel['id']) => Promise<number>
}