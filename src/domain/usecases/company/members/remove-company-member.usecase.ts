import { CompanyEntity, UserEntity } from '@/domain/entities'

export interface RemoveCompanyMemberUseCase {
  call: (companyId: CompanyEntity['id'], userId: UserEntity['id']) => Promise<CompanyEntity | null>
}