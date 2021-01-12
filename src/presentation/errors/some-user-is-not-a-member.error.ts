export class SomeUserIsNotAMemberError extends Error {
  constructor() {
    super('Some user is not a member')
    this.name = 'SomeUserIsNotAMemberError'
  }
}
