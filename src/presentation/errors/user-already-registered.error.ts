export class UserAlreadyRegisteredError extends Error {
  constructor() {
    super('User already registered')
    this.name = 'UserAlreadyRegisteredError'
  }
}
