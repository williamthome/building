import { Technician, UpdateTechnicianDto } from '@/domain/entities'

export interface UpdateTechnicianUseCase {
  call: (id: Technician['id'], dto: UpdateTechnicianDto) => Promise<Technician | null>
}