import { CompanyEntity } from '@/domain/entities'

export interface GetCompanyPhaseCountUseCase {
  call: (id: CompanyEntity['id']) => Promise<number>
}