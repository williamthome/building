import container from '@/shared/dependency-injection'
// > In: presentation layer
import { AddCompanyController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { mockCompanyEntityDto, mockUserEntity } from '@/__tests__/domain/__mocks__/entities'
import { AddCompanyUseCaseSpy, UpdateUserActiveCompanyUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'

//#region Factories

const owner = mockUserEntity()
const companyDto = mockCompanyEntityDto(owner)
const mockHttpRequest = (): HttpRequest<Partial<Omit<CompanyEntity, 'id'>>> => ({
  body: companyDto,
  loggedUserInfo: {
    id: owner.id
  }
})

interface SutTypes {
  sut: AddCompanyController
  addCompanyUseCaseSpy: AddCompanyUseCaseSpy
  updateUserActiveCompanyUseCaseSpy: UpdateUserActiveCompanyUseCaseSpy
}

const makeSut = (): SutTypes => {
  const addCompanyUseCaseSpy = container.resolve<AddCompanyUseCaseSpy>('addCompanyUseCase')
  const updateUserActiveCompanyUseCaseSpy = container.resolve<UpdateUserActiveCompanyUseCaseSpy>('updateUserActiveCompanyUseCase')
  const sut = container.resolve(AddCompanyController)
  return {
    sut,
    addCompanyUseCaseSpy,
    updateUserActiveCompanyUseCaseSpy
  }
}

//#endregion Factories

describe('AddCompany Controller', () => {
  beforeEach(() => {
    container.define('addCompanyUseCase').asNewable(AddCompanyUseCaseSpy).done()
    container.define('updateUserActiveCompanyUseCase').asNewable(UpdateUserActiveCompanyUseCaseSpy).done()
    container.define(AddCompanyController).asNewable(AddCompanyController).done()
  })

  describe('AddCompany UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, addCompanyUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(addCompanyUseCaseSpy.companyDto).toEqual(companyDto)
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
      expect(updateUserActiveCompanyUseCaseSpy.id).toEqual(owner.id)
      expect(updateUserActiveCompanyUseCaseSpy.activeCompanyId).toEqual(addCompanyUseCaseSpy.companyEntity?.id)
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
    expect(response).toEqual(ok(addCompanyUseCaseSpy.companyEntity))
  })
})