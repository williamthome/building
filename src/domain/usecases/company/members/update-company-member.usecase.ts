import { CompanyEntity } from '@/domain/entities'
import { MemberEntity } from '@/domain/entities/nested'
import { MemberDto } from '@/domain/protocols'

export interface UpdateCompanyMemberUseCase {
  call: (companyId: CompanyEntity['id'], memberId: MemberEntity['userId'], memberDto: MemberDto) => Promise<CompanyEntity | null>
}