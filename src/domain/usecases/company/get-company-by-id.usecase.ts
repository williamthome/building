import { CompanyEntity } from '@/domain/entities'

export interface GetCompanyByIdUseCase {
  call: (id: CompanyEntity['id']) => Promise<CompanyEntity | null>
}