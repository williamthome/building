import { TechnicianData } from '@/data/models'

export interface DeleteTechnicianRepository {
  deleteTechnician: (id: TechnicianData['id']) => Promise<TechnicianData | null>
}
