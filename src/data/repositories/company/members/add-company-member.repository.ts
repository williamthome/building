import { CompanyData } from '@/data/models'
import { CreateMemberData } from '@/data/models/nested'

export interface AddCompanyMemberRepository {
  addCompanyMember: (companyId: CompanyData['id'], dto: CreateMemberData) => Promise<CompanyData | null>
}