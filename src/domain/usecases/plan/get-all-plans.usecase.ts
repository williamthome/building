import { PlanEntity } from '@/domain/entities'

export interface GetAllPlansUseCase {
  call: () => Promise<PlanEntity[]>
}