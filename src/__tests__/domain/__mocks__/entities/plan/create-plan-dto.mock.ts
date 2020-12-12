import { CreatePlanDto } from '@/domain/entities'

export const mockCreatePlanDto = (): CreatePlanDto => ({
  limit: 'unlimited',
  value: 'free'
})