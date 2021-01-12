export class UserIsNotAMemberError extends Error {
  constructor() {
    super('User is not a member')
    this.name = 'UserIsNotAMemberError'
  }
}
