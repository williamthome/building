import { Company } from '@/domain/entities'
import { Member } from '@/domain/entities/nested'

export interface RemoveCompanyMemberUseCase {
  call: (companyId: Company['id'], userId: Member['userId']) => Promise<Company | null>
}