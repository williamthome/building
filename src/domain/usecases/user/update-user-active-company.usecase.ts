import { UserEntity } from '@/domain/entities'

export interface UpdateUserActiveCompanyUseCase {
  call: (
    id: UserEntity['id'],
    activeCompanyId: UserEntity['activeCompanyId']
  ) => Promise<void>
}