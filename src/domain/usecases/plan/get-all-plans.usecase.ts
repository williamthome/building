import { Plan } from '@/domain/entities'

export interface GetAllPlansUseCase {
  call: () => Promise<Plan[]>
}
