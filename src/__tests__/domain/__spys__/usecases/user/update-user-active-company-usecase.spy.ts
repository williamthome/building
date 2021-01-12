import { User } from '@/domain/entities'
import { UpdateUserActiveCompanyUseCase } from '@/domain/usecases'

export class UpdateUserActiveCompanyUseCaseSpy implements UpdateUserActiveCompanyUseCase {
  id?: User['id']
  activeCompanyId?: User['activeCompanyId']
  shouldThrow = false

  call = async (id: User['id'], activeCompanyId: User['activeCompanyId']): Promise<void> => {
    this.id = id
    this.activeCompanyId = activeCompanyId

    if (this.shouldThrow) throw new Error()
  }
}
