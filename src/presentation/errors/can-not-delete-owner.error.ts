export class CanNotDeleteOwnerError extends Error {
  constructor () {
    super('Can not delete company owner')
    this.name = 'CanNotDeleteOwnerError'
  }
}