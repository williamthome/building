import { ParamIdMatchActiveCompanyIdMiddleware } from '@/main/middlewares'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: ParamIdMatchActiveCompanyIdMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new ParamIdMatchActiveCompanyIdMiddleware()
  return {
    sut
  }
}

//#endregion Factories

describe('ParamIdMatchActiveCompanyId Middleware', () => {
  it('should return unauthorized if do not match', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        id: fakeData.entity.id()
      },
      activeCompanyInfo: {
        id: fakeData.entity.id()
      }
    })
    expect(response).toEqual(unauthorized())
  })

  it('should return no content if match', async () => {
    const { sut } = makeSut()
    const id = { id: fakeData.entity.id() }
    const response = await sut.handle({
      params: id,
      activeCompanyInfo: id
    })
    expect(response).toEqual(noContent())
  })
})