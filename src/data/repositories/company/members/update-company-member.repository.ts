import { CompanyModel } from '@/data/models'
import { Member } from '@/domain/entities/nested'
import { MemberDto } from '@/domain/protocols'

export interface UpdateCompanyMemberRepository {
  updateCompanyMember: (companyId: CompanyModel['id'], memberId: Member['userId'], memberDto: MemberDto) => Promise<CompanyModel | null>
}