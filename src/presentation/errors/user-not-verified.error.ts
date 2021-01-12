export class UserNotVerifiedError extends Error {
  constructor() {
    super('E-mail verification required')
    this.name = 'UserNotVerifiedError'
  }
}
