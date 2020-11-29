import { CompanyEntity, PlanEntity } from '@/domain/entities'

export type ActiveCompanyInfo =
  Partial<
    Pick<CompanyEntity,
      | 'id'
      | 'members'
    >
  >
  & Partial<
    Pick<PlanEntity,
      | 'limit'
    >
  >