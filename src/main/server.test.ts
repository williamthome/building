import { Server } from './server'

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
    expect(sut.isHealthy()).toBe(true)
    await sut.close()
    expect(sut.isHealthy()).toBe(false)
  })
})