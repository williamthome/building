import { validationHelper } from '../helpers/validation.helper'
import { BaseValidation, Validation, ValidationResult } from '../protocols'

// eslint-disable-next-line no-useless-escape
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

class IsEmailValidation extends BaseValidation<IsEmailValidation> {
  validation = (): IsEmailValidation => this

  validateEmail = (email: string): boolean => {
    if (!email) return false

    if (email.length > 256) return false

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

  validate = <T extends Record<string, unknown>> (
    obj: T,
    key: keyof T,
    validations?: Validation[]
  ): ValidationResult => {
    const valid = key in obj && typeof obj[key] === 'string' && obj[key] !== '' && this.validateEmail(obj[key] as string)
    const errorMessage = `${this.isParam ? 'Param' : 'Field'} ${key} is an invalid e-Mail address`
    return validationHelper.makeValidationResult(
      valid,
      obj,
      key,
      errorMessage,
      this.customErrorMessage,
      validations
    )
  }
}

export const isEmail = new IsEmailValidation()