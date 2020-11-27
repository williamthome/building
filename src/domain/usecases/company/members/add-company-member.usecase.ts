import { CompanyEntity } from '@/domain/entities'
import { MemberEntity } from '@/domain/entities/nested'

export interface AddCompanyMemberUseCase {
  call: (companyId: CompanyEntity['id'], member: MemberEntity) => Promise<CompanyEntity | null>
}