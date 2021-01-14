import { createTransport, Transporter, SendMailOptions } from 'nodemailer'
import handlebars from 'nodemailer-express-handlebars'
import path from 'path'
// : Shared
import { Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { BaseMailer } from './base.mailer'
import { MailOptions, MailParameters } from '../protocols'
// < Out: only domain layer

type NodeMailerOptions = SendMailOptions & {
  template: string
  context?: Record<string, unknown>
}

@Injectable('mailer')
export class NodeMailer extends BaseMailer<NodeMailerOptions> {
  private _transporter?: Transporter

  private get transporter(): Transporter {
    if (!this._transporter) {
      this._transporter = createTransport({
        service: this.service,
        host: this.host,
        auth: {
          user: this.user,
          pass: this.password
        }
      })
      this.transporter.use(
        'compile',
        handlebars({
          viewEngine: {
            extname: '.handlebars',
            partialsDir: 'src/presentation/mailers/views/partials',
            layoutsDir: 'src/presentation/mailers/views',
            defaultLayout: ''
          },
          viewPath: path.resolve(__dirname, 'views'),
          extName: '.handlebars'
        })
      )
    }

    return this._transporter
  }

  send = async <T extends MailParameters>(opts: MailOptions<T>): Promise<void | Error> => {
    try {
      await this.transporter.sendMail(this.parseOptions(opts))
    } catch (error) {
      return error instanceof Error ? error : new Error(error)
    }
  }

  protected parseOptions = <T extends MailParameters>(opts: MailOptions<T>): NodeMailerOptions => ({
    from: this.email,
    to: opts.to,
    template: opts.template.name,
    context: opts.template.parameters,
    attachments: opts.attachments
  })
}
