import fakeData from '@/__tests__/shared/fake-data'
import { CreatePlanData, PlanData } from '@/data/models'

export const mockPlanData = (dto?: CreatePlanData): PlanData => ({
  id: fakeData.entity.id(),
  name: 'Free',
  limit: 'unlimited',
  value: 'free',
  ...dto
})
