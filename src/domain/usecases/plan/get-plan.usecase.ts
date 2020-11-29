import { PlanEntity } from '@/domain/entities'

export interface GetPlanUseCase {
  call: (id: PlanEntity['id']) => Promise<PlanEntity | null>
}