import { PlanData } from '@/data/models'

export interface GetAllPlansRepository {
  getAllPlans: () => Promise<PlanData[]>
}
