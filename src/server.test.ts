import { Server, ServerStatus } from './server'

//#region Factories

interface SutTypes {
  sut: Server
}

const makeSut = (): SutTypes => {
  const sut = new Server()
  return {
    sut
  }
}

//#endregion Factories

describe('Server', () => {
  it('should listen and after close', async () => {
    const { sut } = makeSut()
    await sut.listen()
    let expectedStatus: ServerStatus = 'listening'
    expect(sut.status).toBe(expectedStatus)
    await sut.close()
    expectedStatus = 'closed'
    expect(sut.status).toBe(expectedStatus)
  })
})