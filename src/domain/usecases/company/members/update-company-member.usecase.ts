import { CompanyEntity } from '@/domain/entities'
import { Member } from '@/domain/entities/nested'
import { MemberDto } from '@/domain/protocols'

export interface UpdateCompanyMemberUseCase {
  call: (companyId: CompanyEntity['id'], memberId: Member['userId'], memberDto: MemberDto) => Promise<CompanyEntity | null>
}