import { TechnicianData } from '@/data/models'

export interface GetTechnicianByIdRepository {
  getTechnicianById: (id: TechnicianData['id']) => Promise<TechnicianData | null>
}
