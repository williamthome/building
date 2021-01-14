import { InviteData } from '@/data/models'

export interface GetInvitesByCompanyIdRepository {
  getInvitesByCompanyId: (id: InviteData['companyId']) => Promise<InviteData[]>
}
