import { UserData } from '@/data/models'
import { UpdateUserActiveCompanyRepository } from '@/data/repositories'

export class UpdateUserActiveCompanyRepositorySpy implements UpdateUserActiveCompanyRepository {
  id?: UserData['id']
  activeCompanyId?: UserData['activeCompanyId']
  shouldThrow = false

  updateUserActiveCompany = async (
    id: UserData['id'],
    activeCompanyId: UserData['activeCompanyId']
  ): Promise<void> => {
    this.id = id
    this.activeCompanyId = activeCompanyId

    if (this.shouldThrow) throw new Error()
  }
}
