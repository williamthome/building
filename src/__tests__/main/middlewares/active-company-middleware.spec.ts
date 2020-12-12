import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
import { ActiveCompanyMiddleware } from '@/main/middlewares'
import { badRequest, forbidden, notFound, serverError } from '@/presentation/factories/http.factory'
import { GetCompanyByIdUseCaseSpy, GetPlanByIdUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { AccessDeniedError, ActiveCompanyIsFalsyError, EntityNotFoundError } from '@/presentation/errors'
import { HttpStatusCode } from '@/presentation/constants'
import { HttpRequest } from '@/presentation/protocols'
import { mockAuthorizationHeader } from '@/__tests__/presentation/__mocks__'
import { CompanyRole, UserFeatures } from '@/shared/constants'

//#region Factories

const ownerId = fakeData.entity.id()
const activeCompanyId = fakeData.entity.id()
const accessToken = fakeData.entity.token(fakeData.entity.id(), fakeData.entity.jwtSecret())
const mockHttpRequest = (): HttpRequest<unknown> => ({
  headers: mockAuthorizationHeader(accessToken),
  loggedUserInfo: {
    id: ownerId,
    activeCompanyId
  }
})

interface SutTypes {
  sut: ActiveCompanyMiddleware
  getCompanyByIdUseCaseSpy: GetCompanyByIdUseCaseSpy
  getPlanByIdUseCaseSpy: GetPlanByIdUseCaseSpy
}

const makeSut = (): SutTypes => {
  const getCompanyByIdUseCaseSpy = container.resolve<GetCompanyByIdUseCaseSpy>('getCompanyByIdUseCase')
  const getPlanByIdUseCaseSpy = container.resolve<GetPlanByIdUseCaseSpy>('getPlanByIdUseCase')
  const sut = container.resolve(ActiveCompanyMiddleware)

  getCompanyByIdUseCaseSpy.override = {
    members: [{
      userId: ownerId,
      companyRole: CompanyRole.owner,
      features: UserFeatures.None
    }]
  }

  return {
    sut,
    getCompanyByIdUseCaseSpy,
    getPlanByIdUseCaseSpy
  }
}

//#endregion Factories

describe('ActiveCompany Middleware', () => {
  beforeEach(() => {
    container.define('getCompanyByIdUseCase').asNewable(GetCompanyByIdUseCaseSpy).done()
    container.define('getPlanByIdUseCase').asNewable(GetPlanByIdUseCaseSpy).done()
    container.define(ActiveCompanyMiddleware).asNewable(ActiveCompanyMiddleware).done()
  })

  describe('GetCompanyById UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getCompanyByIdUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(getCompanyByIdUseCaseSpy.id).toBe(activeCompanyId)
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
      expect(response).toEqual(notFound(new EntityNotFoundError('Company')))
    })

    it('should return access denied if user is not a member of active company', async () => {
      const { sut, getCompanyByIdUseCaseSpy } = makeSut()
      getCompanyByIdUseCaseSpy.override = {
        members: []
      }
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(forbidden(new AccessDeniedError()))
    })
  })

  describe('GetPlanById UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getCompanyByIdUseCaseSpy, getPlanByIdUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(getPlanByIdUseCaseSpy.id).toBe(getCompanyByIdUseCaseSpy.company?.planId)
    })

    it('should return server error if throws', async () => {
      const { sut, getPlanByIdUseCaseSpy } = makeSut()
      getPlanByIdUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return plan not found', async () => {
      const { sut, getPlanByIdUseCaseSpy } = makeSut()
      getPlanByIdUseCaseSpy.shouldReturnNull = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(notFound(new EntityNotFoundError('Plan')))
    })
  })

  it('should return active company is falsy', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(badRequest(new ActiveCompanyIsFalsyError()))
  })

  it('should return ok', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response.statusCode).toBe(HttpStatusCode.OK)
  })
})