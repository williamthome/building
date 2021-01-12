import { TechnicianData, UpdateTechnicianData } from '@/data/models'

export interface UpdateTechnicianRepository {
  updateTechnician: (
    id: TechnicianData['id'],
    dto: UpdateTechnicianData
  ) => Promise<TechnicianData | null>
}
