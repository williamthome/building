import { TechnicianModelDto } from '@/data/protocols'
import { TechnicianModel } from '@/data/models'

export interface AddTechnicianRepository {
  addTechnician: (dto: TechnicianModelDto) => Promise<TechnicianModel>
}