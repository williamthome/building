import { TechnicianEntity } from '@/domain/entities'

export interface GetTechnicianByIdUseCase {
  call: (id: TechnicianEntity['id']) => Promise<TechnicianEntity | null>
}