import fakeData from '@/__tests__/shared/fake-data'
import { CreatePlanDto, Plan } from '@/domain/entities'

const id = fakeData.entity.id()

export const mockPlan = (dto?: CreatePlanDto): Plan => ({
  id,
  name: 'Free',
  limit: 'unlimited',
  value: 'free',
  ...dto
})
