import { CompanyEntity } from '@/domain/entities'

export type ActiveCompanyInfo =
  Partial<
    Pick<CompanyEntity,
      | 'id'
      | 'members'
    >
  >