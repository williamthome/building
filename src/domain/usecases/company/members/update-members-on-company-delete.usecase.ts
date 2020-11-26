import { CompanyEntity } from '@/domain/entities'

export interface UpdateMembersOnCompanyDeleteUseCase {
  call: (company: CompanyEntity) => Promise<void>
}