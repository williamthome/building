export class ActiveCompanyIsFalsyError extends Error {
  constructor () {
    super('Active company is falsy')
    this.name = 'ActiveCompanyIsFalsyError'
  }
}