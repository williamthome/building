import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
// > In: presentation layer
import { AddCompanyController } from '@/presentation/controllers'
import { HttpRequest } from '@/presentation/protocols'
import { EntityNotFoundError } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/factories/http.factory'
// < Out: only domain layer
import { CreateCompanyDto } from '@/domain/entities'
import { mockCreateCompanyDto } from '@/__tests__/domain/__mocks__/entities'
import {
  AddCompanyUseCaseSpy,
  GetPlanByIdUseCaseSpy,
  UpdateUserActiveCompanyUseCaseSpy
} from '@/__tests__/domain/__spys__/usecases'

//#region Factories

const ownerId = fakeData.entity.id()
const companyDto = mockCreateCompanyDto({ ownerId })
const mockHttpRequest = (): HttpRequest<CreateCompanyDto> => ({
  body: companyDto,
  loggedUserInfo: {
    id: ownerId
  }
})

interface SutTypes {
  sut: AddCompanyController
  getPlanByIdUseCaseSpy: GetPlanByIdUseCaseSpy
  addCompanyUseCaseSpy: AddCompanyUseCaseSpy
  updateUserActiveCompanyUseCaseSpy: UpdateUserActiveCompanyUseCaseSpy
}

const makeSut = (): SutTypes => {
  const getPlanByIdUseCaseSpy = container.resolve<GetPlanByIdUseCaseSpy>('getPlanByIdUseCase')
  const addCompanyUseCaseSpy = container.resolve<AddCompanyUseCaseSpy>('addCompanyUseCase')
  const updateUserActiveCompanyUseCaseSpy = container.resolve<UpdateUserActiveCompanyUseCaseSpy>(
    'updateUserActiveCompanyUseCase'
  )
  const sut = container.resolve(AddCompanyController)
  return {
    sut,
    getPlanByIdUseCaseSpy,
    addCompanyUseCaseSpy,
    updateUserActiveCompanyUseCaseSpy
  }
}

//#endregion Factories

describe('AddCompany Controller', () => {
  beforeEach(() => {
    container.define('getPlanByIdUseCase').asNewable(GetPlanByIdUseCaseSpy).done()
    container.define('addCompanyUseCase').asNewable(AddCompanyUseCaseSpy).done()
    container
      .define('updateUserActiveCompanyUseCase')
      .asNewable(UpdateUserActiveCompanyUseCaseSpy)
      .done()
    container.define(AddCompanyController).asNewable(AddCompanyController).done()
  })

  describe('GetPlanById UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getPlanByIdUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(getPlanByIdUseCaseSpy.id).toEqual(companyDto.planId)
    })

    it('should return server error if throws', async () => {
      const { sut, getPlanByIdUseCaseSpy } = makeSut()
      getPlanByIdUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return not found', async () => {
      const { sut, getPlanByIdUseCaseSpy } = makeSut()
      getPlanByIdUseCaseSpy.shouldReturnNull = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(notFound(new EntityNotFoundError('Plan')))
    })
  })

  describe('AddCompany UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, addCompanyUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(addCompanyUseCaseSpy.dto).toEqual(companyDto)
    })

    it('should return server error if throws', async () => {
      const { sut, addCompanyUseCaseSpy } = makeSut()
      addCompanyUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })
  })

  describe('UpdateCompany UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, updateUserActiveCompanyUseCaseSpy, addCompanyUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(updateUserActiveCompanyUseCaseSpy.id).toEqual(ownerId)
      expect(updateUserActiveCompanyUseCaseSpy.activeCompanyId).toEqual(
        addCompanyUseCaseSpy.company?.id
      )
    })

    it('should return server error if throws', async () => {
      const { sut, updateUserActiveCompanyUseCaseSpy } = makeSut()
      updateUserActiveCompanyUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })
  })

  it('shold return ok with a new company on body', async () => {
    const { sut, addCompanyUseCaseSpy } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok(addCompanyUseCaseSpy.company))
  })
})
