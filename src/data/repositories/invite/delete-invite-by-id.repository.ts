import { InviteData } from '@/data/models'

export interface DeleteInviteByIdRepository {
  deleteInviteById: (id: InviteData['id']) => Promise<InviteData | null>
}
