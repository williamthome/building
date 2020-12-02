import { TechnicianEntity } from '@/domain/entities'
import { TechnicianEntityDto } from '@/domain/protocols'

export interface UpdateTechnicianUseCase {
  call: (id: TechnicianEntity['id'], dto: TechnicianEntityDto) => Promise<TechnicianEntity | null>
}