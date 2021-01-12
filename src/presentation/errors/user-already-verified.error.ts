export class UserAlreadyVerifiedError extends Error {
  constructor() {
    super('User already verified')
    this.name = 'UserAlreadyVerifiedError'
  }
}
