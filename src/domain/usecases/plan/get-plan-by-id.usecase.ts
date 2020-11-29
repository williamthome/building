import { PlanEntity } from '@/domain/entities'

export interface GetPlanByIdUseCase {
  call: (id: PlanEntity['id']) => Promise<PlanEntity | null>
}