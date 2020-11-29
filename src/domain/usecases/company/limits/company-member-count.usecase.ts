import { CompanyEntity } from '@/domain/entities'

export interface GetCompanyMemberCountUseCase {
  call: (id: CompanyEntity['id']) => Promise<number>
}