import { CompanyModel } from '@/data/models'
import { MemberModel } from '@/data/models/nested'

export interface AddCompanyMemberRepository {
  addCompanyMember: (companyId: CompanyModel['id'], member: MemberModel) => Promise<CompanyModel | null>
}