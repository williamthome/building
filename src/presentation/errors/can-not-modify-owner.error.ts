export class CanNotModifyOwnerError extends Error {
  constructor () {
    super('Can not modify company owner')
    this.name = 'CanNotModifyOwnerError'
  }
}