import { App } from './protocols'
import { mockApp } from './__test__/mocks/app.mock'

//#region Factories

interface SutTypes {
  sut: App<any, any, any>
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