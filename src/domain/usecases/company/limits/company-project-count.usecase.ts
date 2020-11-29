import { CompanyEntity } from '@/domain/entities'

export interface GetCompanyProjectCountUseCase {
  call: (id: CompanyEntity['id']) => Promise<number>
}