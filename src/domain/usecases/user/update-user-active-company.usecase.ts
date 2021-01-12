import { User } from '@/domain/entities'

export interface UpdateUserActiveCompanyUseCase {
  call: (id: User['id'], activeCompanyId: User['activeCompanyId']) => Promise<void>
}
