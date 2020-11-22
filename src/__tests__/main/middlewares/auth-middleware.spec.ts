import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
import { AuthMiddleware } from '@/main/middlewares'
import { forbidden, notFound, serverError } from '@/presentation/factories/http.factory'
import { GetUserByAccessTokenUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { AccessDeniedError, CanNotFindEntityError } from '@/presentation/errors'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { HttpRequest } from '@/presentation/protocols'

//#region Factories

const accessToken = fakeData.entity.token()
const mockHttpRequest = (): HttpRequest<unknown> => ({
  headers: {
    [HttpHeaderName.AUTHORIZATION]: `Bearer ${accessToken}`
  }
})

interface SutTypes {
  sut: AuthMiddleware
  getUserByAccessTokenUseCaseSpy: GetUserByAccessTokenUseCaseSpy
}

const makeSut = (): SutTypes => {
  const getUserByAccessTokenUseCaseSpy = container.resolve<GetUserByAccessTokenUseCaseSpy>('getUserByAccessTokenUseCase')
  const sut = container.resolve(AuthMiddleware)
  return {
    sut,
    getUserByAccessTokenUseCaseSpy
  }
}

//#endregion Factories

describe('Auth Middleware', () => {
  beforeEach(() => {
    container.define('getUserByAccessTokenUseCase').asNewable(GetUserByAccessTokenUseCaseSpy).done()
    container.define(AuthMiddleware).asNewable(AuthMiddleware).done()
  })

  describe('accessToken', () => {
    it('should return forbidden if headers are undefined', async () => {
      const { sut } = makeSut()
      const response = await sut.handle({})
      expect(response).toEqual(forbidden(new AccessDeniedError()))
    })

    it('should return forbidden if authorization token is undefined', async () => {
      const { sut } = makeSut()
      const response = await sut.handle({
        headers: {
          [HttpHeaderName.AUTHORIZATION]: undefined
        }
      })
      expect(response).toEqual(forbidden(new AccessDeniedError()))
    })

    it('should return forbidden if authorization token not starts with \'Bearer\'', async () => {
      const { sut } = makeSut()
      const response = await sut.handle({
        headers: {
          [HttpHeaderName.AUTHORIZATION]: accessToken
        }
      })
      expect(response).toEqual(forbidden(new AccessDeniedError()))
    })
  })

  describe('GetUserByAccessToken UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getUserByAccessTokenUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(getUserByAccessTokenUseCaseSpy.accessToken).toBe(accessToken)
    })

    it('should return server error if throws', async () => {
      const { sut, getUserByAccessTokenUseCaseSpy } = makeSut()
      getUserByAccessTokenUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return user not found', async () => {
      const { sut, getUserByAccessTokenUseCaseSpy } = makeSut()
      getUserByAccessTokenUseCaseSpy.shouldReturnNull = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(notFound(new CanNotFindEntityError('User')))
    })
  })

  it('should return ok', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response.statusCode).toBe(HttpStatusCode.OK)
  })
})