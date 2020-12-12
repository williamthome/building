import { CompanyData } from '@/data/models'
import { MemberData } from '@/data/models/nested'

export interface RemoveCompanyMemberRepository {
  removeCompanyMember: (companyId: CompanyData['id'], userId: MemberData['userId']) => Promise<CompanyData | null>
}