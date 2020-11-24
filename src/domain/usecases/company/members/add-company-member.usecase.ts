import { CompanyEntity } from '@/domain/entities'
import { Member } from '@/domain/entities/nested'

export interface AddCompanyMemberUseCase {
  call: (companyId: CompanyEntity['id'], member: Member) => Promise<CompanyEntity | null>
}