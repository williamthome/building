import { UserModel } from '@/data/models'

export interface UpdateUserActiveCompanyRepository {
  updateUserActiveCompany: (
    id: UserModel['id'],
    activeCompanyId: UserModel['activeCompanyId']
  ) => Promise<void>
}