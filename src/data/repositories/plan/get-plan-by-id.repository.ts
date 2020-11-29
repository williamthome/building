import { PlanModel } from '@/data/models'

export interface GetPlanByIdRepository {
  getPlanById: (id: PlanModel['id']) => Promise<PlanModel | null>
}