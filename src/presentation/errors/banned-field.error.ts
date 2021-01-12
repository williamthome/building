export class BannedFieldError extends Error {
  constructor(field: PropertyKey) {
    super(`Field ${field.toString()} is not permitted`)
    this.name = 'BannedFieldError'
  }
}
