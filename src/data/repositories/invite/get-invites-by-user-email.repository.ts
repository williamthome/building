import { InviteData } from '@/data/models'

export interface GetInvitesByUserEmailRepository {
  getInvitesByUserEmail: (email: InviteData['to']) => Promise<InviteData[]>
}
