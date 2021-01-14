import { Company, CreateInviteDto, Invite, User } from '@/domain/entities'

export interface AddInviteUseCase {
  call: (
    dto: CreateInviteDto,
    loggedUserId: User['id'],
    activeCompanyId: Company['id']
  ) => Promise<Invite>
}
