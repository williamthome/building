export class CanNotAddMoreOwnesrError extends Error {
  constructor() {
    super('Can not add more owners')
    this.name = 'CanNotAddMoreOwnesrError'
  }
}
