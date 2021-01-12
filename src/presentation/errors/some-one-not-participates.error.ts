export class SomeOneNotParticipatesError extends Error {
  constructor() {
    super('Some user is not a participant')
    this.name = 'SomeOneNotParticipatesError'
  }
}
