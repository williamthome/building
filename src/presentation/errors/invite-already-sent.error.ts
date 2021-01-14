export class InviteAlreadySentError extends Error {
  constructor() {
    super('Invite already sent')
    this.name = 'InviteAlreadySentError'
  }
}
