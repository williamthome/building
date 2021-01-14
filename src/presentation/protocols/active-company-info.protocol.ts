import { Company, Plan } from '@/domain/entities'

export type ActiveCompanyInfo = Partial<Pick<Company, 'id' | 'name' | 'members'>> &
  Partial<Pick<Plan, 'limit'>>
