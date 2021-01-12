import { UserData } from '@/data/models'

export interface UpdateUserActiveCompanyRepository {
  updateUserActiveCompany: (
    id: UserData['id'],
    activeCompanyId: UserData['activeCompanyId']
  ) => Promise<void>
}
