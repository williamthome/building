import { TechnicianEntity } from '@/domain/entities'

export interface DeleteTechnicianUseCase {
  call: (id: TechnicianEntity['id']) => Promise<TechnicianEntity | null>
}