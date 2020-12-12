import { Technician } from '@/domain/entities'

export interface DeleteTechnicianUseCase {
  call: (id: Technician['id']) => Promise<Technician | null>
}