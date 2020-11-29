import { PlanEntity } from '@/domain/entities'

export const mockPlanEntityDto = (): Omit<PlanEntity, 'id'> => ({
  limit: 'unlimited',
  value: 'free'
})