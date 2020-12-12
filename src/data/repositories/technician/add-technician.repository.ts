import { CreateTechnicianData, TechnicianData } from '@/data/models'

export interface AddTechnicianRepository {
  addTechnician: (dto: CreateTechnicianData) => Promise<TechnicianData>
}