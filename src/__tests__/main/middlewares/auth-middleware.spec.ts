import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
import { AuthMiddleware } from '@/main/middlewares'
import { forbidden, notFound, serverError } from '@/presentation/factories/http.factory'
import { GetCompanyByIdUseCaseSpy, GetUserByAccessTokenUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { AccessDeniedError, CanNotFindEntityError } from '@/presentation/errors'
import { HttpHeaderName, HttpStatusCode } from '@/presentation/constants'
import { HttpRequest } from '@/presentation/protocols'
import { mockAuthorizationHeader } from '@/__tests__/presentation/__mocks__'

//#region Factories

const accessToken = fakeData.entity.token()
const mockHttpRequest = (): HttpRequest<unknown> => ({
  headers: mockAuthorizationHeader(accessToken)
})

interface SutTypes {
  sut: AuthMiddleware
  getUserByAccessTokenUseCaseSpy: GetUserByAccessTokenUseCaseSpy
  getCompanyByIdUseCaseSpy: GetCompanyByIdUseCaseSpy
}

const makeSut = (): SutTypes => {
  const getUserByAccessTokenUseCaseSpy = container.resolve<GetUserByAccessTokenUseCaseSpy>('getUserByAccessTokenUseCase')
  const getCompanyByIdUseCaseSpy = container.resolve<GetCompanyByIdUseCaseSpy>('getCompanyByIdUseCase')
  const sut = container.resolve(AuthMiddleware)
  return {
    sut,
    getUserByAccessTokenUseCaseSpy,
    getCompanyByIdUseCaseSpy
  }
}

//#endregion Factories

describe('Auth Middleware', () => {
  beforeEach(() => {
    container.define('getUserByAccessTokenUseCase').asNewable(GetUserByAccessTokenUseCaseSpy).done()
    container.define('getCompanyByIdUseCase').asNewable(GetCompanyByIdUseCaseSpy).done()
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
        headers: mockAuthorizationHeader(undefined)
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

  describe('GetCompanyById UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getUserByAccessTokenUseCaseSpy, getCompanyByIdUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(getCompanyByIdUseCaseSpy.id).toBe(getUserByAccessTokenUseCaseSpy.userModel?.activeCompanyId)
    })

    it('should return server error if throws', async () => {
      const { sut, getCompanyByIdUseCaseSpy } = makeSut()
      getCompanyByIdUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return company not found', async () => {
      const { sut, getCompanyByIdUseCaseSpy } = makeSut()
      getCompanyByIdUseCaseSpy.shouldReturnNull = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(notFound(new CanNotFindEntityError('Company')))
    })
  })

  it('should return ok without user active company id', async () => {
    const { sut, getUserByAccessTokenUseCaseSpy } = makeSut()
    getUserByAccessTokenUseCaseSpy.override = {
      activeCompanyId: undefined
    }
    const response = await sut.handle(mockHttpRequest())
    expect(response.statusCode).toBe(HttpStatusCode.OK)
  })

  it('should return ok', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response.statusCode).toBe(HttpStatusCode.OK)
  })
})