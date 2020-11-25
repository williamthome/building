import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
import { AuthMiddleware } from '@/main/middlewares'
import { notFound, serverError, unauthorized } from '@/presentation/factories/http.factory'
import { GetUserByAccessTokenUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { EntityNotFoundError } from '@/presentation/errors'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { HttpRequest } from '@/presentation/protocols'
import { mockAuthorizationHeader } from '@/__tests__/presentation/__mocks__'

//#region Factories

const accessToken = fakeData.entity.token(fakeData.entity.id(), fakeData.entity.jwtSecret())
const mockHttpRequest = (): HttpRequest<unknown> => ({
  headers: mockAuthorizationHeader(accessToken)
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
    it('should return unauthorized if headers are undefined', async () => {
      const { sut } = makeSut()
      const response = await sut.handle({})
      expect(response).toEqual(unauthorized())
    })

    it('should return unauthorized if authorization token is undefined', async () => {
      const { sut } = makeSut()
      const response = await sut.handle({
        headers: mockAuthorizationHeader(undefined)
      })
      expect(response).toEqual(unauthorized())
    })

    it('should return unauthorized if authorization token not starts with \'Bearer\'', async () => {
      const { sut } = makeSut()
      const response = await sut.handle({
        headers: {
          [HttpHeaderName.AUTHORIZATION]: accessToken
        }
      })
      expect(response).toEqual(unauthorized())
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
      expect(response).toEqual(notFound(new EntityNotFoundError('User')))
    })
  })

  it('should return ok', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response.statusCode).toBe(HttpStatusCode.OK)
  })
})