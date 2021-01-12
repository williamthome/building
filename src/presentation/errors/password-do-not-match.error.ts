export class PasswordDoNotMatchError extends Error {
  constructor() {
    super('Password do not match')
    this.name = 'PasswordDoNotMatchError'
  }
}
