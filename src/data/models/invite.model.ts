import { Invite, CreateInviteDto } from '@/domain/entities'

export type InviteData = Invite

export type CreateInviteData = CreateInviteDto & Pick<InviteData, 'from' | 'companyId'>
