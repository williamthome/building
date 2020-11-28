export class UserAlreadyAMemberError extends Error {
  constructor () {
    super('User already a member')
    this.name = 'UserAlreadyAMemberError'
  }
}