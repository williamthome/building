import { Invite } from '@/domain/entities'

export interface GetInvitesByCompanyIdUseCase {
  call: (id: Invite['companyId']) => Promise<Invite[]>
}
