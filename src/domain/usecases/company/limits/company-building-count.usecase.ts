import { CompanyEntity } from '@/domain/entities'

export interface GetCompanyBuildingCountUseCase {
  call: (id: CompanyEntity['id']) => Promise<number>
}