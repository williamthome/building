import { PlanModel } from '@/data/models'

export interface GetPlanRepository {
  getPlan: (id: PlanModel['id']) => Promise<PlanModel | null>
}