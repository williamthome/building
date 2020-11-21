import { UserEntity } from '@/domain/entities'
import { UpdateUserActiveCompanyUseCase } from '@/domain/usecases'

export class UpdateUserActiveCompanyUseCaseSpy implements UpdateUserActiveCompanyUseCase {
  id?: UserEntity['id']
  activeCompanyId?:  UserEntity['activeCompanyId']
  shouldThrow = false

  call = async (
    id: UserEntity['id'],
    activeCompanyId: UserEntity['activeCompanyId']
  ): Promise<void> => {
    this.id = id
    this.activeCompanyId = activeCompanyId

    if (this.shouldThrow) throw new Error()
  }
}