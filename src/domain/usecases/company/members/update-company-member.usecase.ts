import { Company } from '@/domain/entities'
import { Member, UpdateMemberDto } from '@/domain/entities/nested'

export interface UpdateCompanyMemberUseCase {
  call: (
    companyId: Company['id'],
    userId: Member['userId'],
    dto: UpdateMemberDto
  ) => Promise<Company | null>
}
