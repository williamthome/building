import { PlanModel } from '@/data/models'

export interface GetAllPlansRepository {
  getAllPlans: () => Promise<PlanModel[]>
}