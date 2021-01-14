import { CreateInviteData, InviteData } from '@/data/models'

export interface AddInviteRepository {
  addInvite: (dto: CreateInviteData) => Promise<InviteData>
}
