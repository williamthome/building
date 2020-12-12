import { Plan } from '@/domain/entities'

export interface GetPlanByIdUseCase {
  call: (id: Plan['id']) => Promise<Plan | null>
}