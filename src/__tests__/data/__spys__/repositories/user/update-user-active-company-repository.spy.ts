import { UserModel } from '@/data/models'
import { UpdateUserActiveCompanyRepository } from '@/data/repositories'

export class UpdateUserActiveCompanyRepositorySpy implements UpdateUserActiveCompanyRepository {
  id?: UserModel['id']
  activeCompanyId?:  UserModel['activeCompanyId']
  shouldThrow = false

  updateUserActiveCompany = async (
    id: UserModel['id'],
    activeCompanyId: UserModel['activeCompanyId']
  ): Promise<void> => {
    this.id = id
    this.activeCompanyId = activeCompanyId

    if (this.shouldThrow) throw new Error()
  }
}