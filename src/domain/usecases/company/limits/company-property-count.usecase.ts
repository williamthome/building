import { PropertyEntity } from '@/domain/entities'

export interface GetCompanyPropertyCountUseCase {
  call: (id: PropertyEntity['id']) => Promise<number>
}