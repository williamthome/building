import { TechnicianModel } from '@/data/models'

export interface DeleteTechnicianRepository {
  deleteTechnician: (id: TechnicianModel['id']) => Promise<TechnicianModel | null>
}