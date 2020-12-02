import { TechnicianModel } from '@/data/models'

export interface GetTechnicianByIdRepository {
  getTechnicianById: (id: TechnicianModel['id']) => Promise<TechnicianModel | null>
}