import { Invite } from '@/domain/entities'

export interface DeleteInviteUseCase {
  call: (id: Invite['id']) => Promise<Invite | null>
}
