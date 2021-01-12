import { CreatePlanDto } from '@/domain/entities'

export const mockCreatePlanDto = (): CreatePlanDto => ({
  name: 'Free',
  limit: 'unlimited',
  value: 'free'
})
