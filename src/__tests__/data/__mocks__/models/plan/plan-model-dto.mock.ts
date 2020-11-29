import { PlanModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'

export const mockPlanModelDto = (): ModelDto<PlanModel> => ({
  limit: 'unlimited',
  value: 'free'
})