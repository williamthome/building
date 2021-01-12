import { Company } from '@/domain/entities'
import { CreateMemberDto } from '@/domain/entities/nested'

export interface AddCompanyMemberUseCase {
  call: (companyId: Company['id'], dto: CreateMemberDto) => Promise<Company | null>
}
