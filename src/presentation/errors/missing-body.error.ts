export class MissingBodyError extends Error {
  constructor() {
    super('Data is required')
    this.name = 'MissingBodyError'
  }
}
