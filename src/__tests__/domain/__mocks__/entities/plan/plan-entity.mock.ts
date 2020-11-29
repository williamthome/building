import fakeData from '@/__tests__/shared/fake-data'
import { PlanEntity } from '@/domain/entities'

const id = fakeData.entity.id()

export const mockPlanEntity = (planDto?: Partial<Omit<PlanEntity, 'id'>>): PlanEntity => ({
  id,
  limit: 'unlimited',
  value: 'free',
  ...planDto
})