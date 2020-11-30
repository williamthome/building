import fakeData from '@/__tests__/shared/fake-data'
import { PlanModel } from '@/data/models'
import { PlanModelDto } from '@/data/protocols'

export const mockPlanModel = (planDto?: PlanModelDto): PlanModel => ({
  id: fakeData.entity.id(),
  limit: 'unlimited',
  value: 'free',
  ...planDto,
})