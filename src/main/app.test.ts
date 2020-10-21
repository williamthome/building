import { Application } from './app'
import { mockApp } from './__tests__/mocks/app.mock'

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
    expect(sut.isHealthy()).toBe(true)
    await sut.stop()
    expect(sut.isHealthy()).toBe(false)
  })
})