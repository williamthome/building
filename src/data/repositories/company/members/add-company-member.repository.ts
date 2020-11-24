import { CompanyModel } from '@/data/models'
import { Member } from '@/domain/entities/nested'

export interface AddCompanyMemberRepository {
  addCompanyMember: (companyId: CompanyModel['id'], member: Member) => Promise<CompanyModel | null>
}