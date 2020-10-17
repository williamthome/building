import { Application } from './app'
import { mockApp } from './__test__/mocks/app.mock'

//#region Factories

interface SutTypes {
  sut: Application
}

const makeSut = (): SutTypes => {
  const sut = mockApp()
  return {
    sut
  }
}

//#endregion Factories

describe('Application', () => {
  it('should run and after stop', async () => {
    const { sut } = makeSut()
    await sut.run()
    expect(sut.db.isConnected).toBe(true)
    expect(sut.webServer.isListening).toBe(true)
    await sut.stop()
    expect(sut.db.isConnected).toBe(false)
    expect(sut.webServer.isListening).toBe(false)
  })
})