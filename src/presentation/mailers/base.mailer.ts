// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Mailer, MailOptions, MailParameters } from '../protocols'
// < Out: only domain layer

export abstract class BaseMailer<TOptions> implements Mailer {
  constructor(
    @Inject('MAIL_SERVICE') protected readonly service: string,

    @Inject('MAIL_HOST') protected readonly host: string,

    @Inject('MAIL_USER') protected readonly user: string,

    @Inject('MAIL_PASSWORD') protected readonly password: string,

    @Inject('MAIL_EMAIL') protected readonly email: string
  ) {}

  abstract send: <T extends MailParameters>(opts: MailOptions<T>) => Promise<void | Error>

  protected abstract parseOptions: <T extends MailParameters>(opts: MailOptions<T>) => TOptions
}
