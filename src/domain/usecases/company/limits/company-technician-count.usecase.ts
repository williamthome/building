import { TechnicianEntity } from '@/domain/entities'

export interface GetCompanyTechnicianCountUseCase {
  call: (id: TechnicianEntity['id']) => Promise<number>
}