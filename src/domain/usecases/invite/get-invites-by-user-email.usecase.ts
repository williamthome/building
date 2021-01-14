import { Invite } from '@/domain/entities'

export interface GetInvitesByUserEmailUseCase {
  call: (email: Invite['to']) => Promise<Invite[]>
}
