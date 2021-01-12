import { CompanyData } from '@/data/models'
import { MemberData, UpdateMemberData } from '@/data/models/nested'

export interface UpdateCompanyMemberRepository {
  updateCompanyMember: (
    companyId: CompanyData['id'],
    userId: MemberData['userId'],
    dto: UpdateMemberData
  ) => Promise<CompanyData | null>
}
