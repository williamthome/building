export type MailParameters = Record<string, unknown>

export interface MailTemplate<T extends MailParameters> {
  name: string
  parameters: T
}

export interface MailAttachment {
  filename: string
  path: string
}

export interface MailOptions<TParameters extends MailParameters> {
  to: string | string[]
  subject: string
  template: MailTemplate<TParameters>
  attachments?: MailAttachment[]
}

export interface Mailer {
  send: <T extends MailParameters>(opts: MailOptions<T>) => Promise<void | Error>
}
