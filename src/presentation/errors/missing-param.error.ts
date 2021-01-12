export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Param ${paramName} is missing`)
    this.name = 'MissingParamError'
  }
}
