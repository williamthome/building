import { CompanyEntity } from '@/domain/entities'
import { MemberEntity } from '@/domain/entities/nested'
import { MemberEntityDto } from '@/domain/protocols'

export interface UpdateCompanyMemberUseCase {
  call: (companyId: CompanyEntity['id'], memberId: MemberEntity['userId'], memberDto: MemberEntityDto) => Promise<CompanyEntity | null>
}