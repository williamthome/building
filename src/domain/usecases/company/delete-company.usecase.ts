import { CompanyEntity } from '@/domain/entities'

export interface DeleteCompanyUseCase {
  call: (companyId: CompanyEntity['id']) => Promise<CompanyEntity | null>
}