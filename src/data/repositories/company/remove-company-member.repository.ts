import { CompanyModel, UserModel } from '@/data/models'

export interface RemoveCompanyMemberRepository {
  removeCompanyMember: (companyId: CompanyModel['id'], userId: UserModel['id']) => Promise<CompanyModel | null>
}