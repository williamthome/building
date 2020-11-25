// : Shared
import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
// > In: presentation layer
import { UpdateUserActiveCompanyController } from '@/presentation/controllers'
import { forbidden, noContent, notFound, serverError } from '@/presentation/factories/http.factory'
import { AccessDeniedError, EntityNotFoundError } from '@/presentation/errors'
import { HttpRequest } from '@/presentation/protocols'
// < Out: only domain layer
import { UserDto } from '@/domain/protocols'
import { GetCompanyByIdUseCaseSpy, UpdateUserActiveCompanyUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { CompanyRole, UserFeatures } from '@/shared/constants'

//#region Factories

const userId = fakeData.entity.id()
const companyId = fakeData.entity.id()
const mockHttpRequest = (): HttpRequest<UserDto> => ({
  loggedUserInfo: {
    id: userId
  },
  params: {
    companyId
  }
})

interface SutTypes {
  sut: UpdateUserActiveCompanyController
  getCompanyByIdUseCaseSpy: GetCompanyByIdUseCaseSpy
  updateUserActiveCompanyUseCaseSpy: UpdateUserActiveCompanyUseCaseSpy
}

const makeSut = (): SutTypes => {
  const getCompanyByIdUseCaseSpy = container.resolve<GetCompanyByIdUseCaseSpy>('getCompanyByIdUseCase')
  const updateUserActiveCompanyUseCaseSpy = container.resolve<UpdateUserActiveCompanyUseCaseSpy>('updateUserActiveCompanyUseCase')
  const sut = container.resolve(UpdateUserActiveCompanyController)
  return {
    sut,
    getCompanyByIdUseCaseSpy,
    updateUserActiveCompanyUseCaseSpy
  }
}

//#endregion Factories

describe('UpdateUserActiveCompany Controller', () => {
  beforeEach(() => {
    container.define('getCompanyByIdUseCase').asNewable(GetCompanyByIdUseCaseSpy).done()
    container.define('updateUserActiveCompanyUseCase').asNewable(UpdateUserActiveCompanyUseCaseSpy).done()
    container.define(UpdateUserActiveCompanyController).asNewable(UpdateUserActiveCompanyController).done()
  })

  describe('GetCompanyById UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getCompanyByIdUseCaseSpy } = makeSut()
      getCompanyByIdUseCaseSpy.override = {
        members: [{
          userId,
          companyRole: CompanyRole.owner,
          features: UserFeatures.None
        }]
      }
      await sut.handle(mockHttpRequest())
      expect(getCompanyByIdUseCaseSpy.id).toEqual(companyId)
    })

    it('should return server error if throws', async () => {
      const { sut, getCompanyByIdUseCaseSpy } = makeSut()
      getCompanyByIdUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return not found', async () => {
      const { sut, getCompanyByIdUseCaseSpy } = makeSut()
      getCompanyByIdUseCaseSpy.shouldReturnNull = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(notFound(new EntityNotFoundError('Company')))
    })

    it('should return access denied if user in not a member', async () => {
      const { sut } = makeSut()
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(forbidden(new AccessDeniedError()))
    })
  })

  describe('UpdateUserActiveCompany UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getCompanyByIdUseCaseSpy, updateUserActiveCompanyUseCaseSpy } = makeSut()
      getCompanyByIdUseCaseSpy.override = {
        members: [{
          userId,
          companyRole: CompanyRole.owner,
          features: UserFeatures.None
        }]
      }
      await sut.handle(mockHttpRequest())
      expect(updateUserActiveCompanyUseCaseSpy.id).toEqual(userId)
      expect(updateUserActiveCompanyUseCaseSpy.activeCompanyId).toEqual(companyId)
    })

    it('should return server error if throws', async () => {
      const { sut, getCompanyByIdUseCaseSpy, updateUserActiveCompanyUseCaseSpy } = makeSut()
      getCompanyByIdUseCaseSpy.override = {
        members: [{
          userId,
          companyRole: CompanyRole.owner,
          features: UserFeatures.None
        }]
      }
      updateUserActiveCompanyUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })
  })

  it('shold return no content', async () => {
    const { sut, getCompanyByIdUseCaseSpy } = makeSut()
    getCompanyByIdUseCaseSpy.override = {
      members: [{
        userId,
        companyRole: CompanyRole.owner,
        features: UserFeatures.None
      }]
    }
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(noContent())
  })
})