import { CompanyModel } from '@/data/models'
import { MemberModel } from '@/data/models/nested'

export interface UpdateCompanyMemberRepository {
  updateCompanyMember: (companyId: CompanyModel['id'], memberId: MemberModel['userId'], memberDto: Partial<MemberModel>) => Promise<CompanyModel | null>
}