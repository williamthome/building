import { PlanData } from '@/data/models'

export interface GetPlanByIdRepository {
  getPlanById: (id: PlanData['id']) => Promise<PlanData | null>
}
