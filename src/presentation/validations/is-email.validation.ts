import { makeValidationResult } from '../helpers/validation.helper'
import { Validation, ValidationResult } from '../protocols'

export const isEmail: Validation = {
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    customErrorMessage?: string
  ): ValidationResult => {
    const valid = field in obj && typeof obj[field] === 'string' && obj[field] !== '' && validateEmail(obj[field] as string)
    const errorMessage = `Field ${field} is an invalid e-Mail address`
    return makeValidationResult(
      valid,
      obj,
      field,
      errorMessage,
      customErrorMessage,
      validations
    )
  }
}

// eslint-disable-next-line no-useless-escape
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

const validateEmail = (email: string): boolean => {
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