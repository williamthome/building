import fakeData from '@/__tests__/shared/fake-data'
import { PlanModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'

export const mockPlanModel = (planDto?: ModelDto<PlanModel>): PlanModel => ({
  id: fakeData.entity.id(),
  limit: 'unlimited',
  value: 'free',
  ...planDto,
})