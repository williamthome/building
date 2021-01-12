import { Technician } from '@/domain/entities'

export interface GetTechnicianByIdUseCase {
  call: (id: Technician['id']) => Promise<Technician | null>
}
