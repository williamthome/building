import { Company, Invite } from '../entities'

export const inviteAlreadySent = (
  invites: Invite[],
  email: Invite['to'],
  companyId: Company['id']
): boolean => invites.some((invite) => invite.to === email && invite.companyId === companyId)
