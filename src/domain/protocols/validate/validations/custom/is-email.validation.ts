import { Validate, ValidateOptions } from '../../validate.protocol'

class IsEmailValidation extends Validate<IsEmailValidation> {
  validation = (): IsEmailValidation => this

  constructor (opts: ValidateOptions | undefined) { super(opts) }

  validate = (key: string, value: any): string | void => {
    const valid = this.validateEmail(value)
    if (valid) return
    return this.opts?.customMessage || `${key} is an invalid e-Mail address`
  }

  private validateEmail = (email: string): boolean => {
    if (!email) return false

    if (email.length > 256) return false

    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!emailRegex.test(email)) return false

    const emailParts = email.split('@')
    const account = emailParts[0]
    const address = emailParts[1]
    if (account.length > 64) return false

    const domainParts = address.split('.')
    if (domainParts.some(function (part) {
      return part.length > 63
    })) return false

    return true
  }
}

export const isEmail = (
  opts?: ValidateOptions
): IsEmailValidation => new IsEmailValidation(opts)