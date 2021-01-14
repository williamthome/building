import { MailParameters, MailTemplate } from '@/presentation/protocols'

export interface SendInviteParameters extends MailParameters {
  email: string
  invitedFrom: string
  companyName: string
  inviteLink: string
}

export const sendInviteTemplate = (
  parameters: SendInviteParameters
): MailTemplate<SendInviteParameters> => ({
  name: 'send-invite',
  parameters
})
