import { ParamIdMatchLoggedUserIdMiddleware } from '@/main/middlewares'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: ParamIdMatchLoggedUserIdMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new ParamIdMatchLoggedUserIdMiddleware()
  return {
    sut
  }
}

//#endregion Factories

describe('ParamIdMatchLoggedUserIdMiddleware Middleware', () => {
  it('should return unauthorized if do not match', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        id: fakeData.entity.id()
      },
      loggedUserInfo: {
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
      loggedUserInfo: id
    })
    expect(response).toEqual(noContent())
  })
})