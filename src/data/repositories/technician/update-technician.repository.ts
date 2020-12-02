import { TechnicianModelDto } from '@/data/protocols'
import { TechnicianModel } from '@/data/models'

export interface UpdateTechnicianRepository {
  updateTechnician: (id: TechnicianModel['id'], dto: TechnicianModelDto) => Promise<TechnicianModel | null>
}