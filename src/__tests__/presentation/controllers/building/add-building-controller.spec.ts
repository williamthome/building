import fakeData from '@/__tests__/shared/fake-data'
import container from '@/shared/dependency-injection'
// > In: presentation layer
import { AddBuildingController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
// < Out: only domain layer
import { AddBuildingUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { mockCreateBuildingDto, mockPlan } from '@/__tests__/domain/__mocks__/entities'
import { CreateBuildingDto } from '@/domain/entities'

//#region Factories

const companyId = fakeData.entity.id()
const buildingDto = mockCreateBuildingDto()
const plan = mockPlan()
const mockHttpRequest = ({
  buildingLimit
}: { buildingLimit?: number } = {}): HttpRequest<CreateBuildingDto> => ({
  body: buildingDto,
  activeCompanyInfo: {
    id: companyId,
    limit:
      buildingLimit !== undefined
        ? {
            building: buildingLimit,
            member: 1,
            customer: 1,
            phase: 1,
            property: 1,
            technician: 1,
            project: 1,
            storageMb: 0
          }
        : plan.limit
  }
})

interface SutTypes {
  sut: AddBuildingController
  addBuildingUseCaseSpy: AddBuildingUseCaseSpy
}

const makeSut = (): SutTypes => {
  const addBuildingUseCaseSpy = container.resolve<AddBuildingUseCaseSpy>('addBuildingUseCase')
  const sut = container.resolve(AddBuildingController)
  return {
    sut,
    addBuildingUseCaseSpy
  }
}

//#endregion Factories

describe('AddBuilding Controller', () => {
  beforeEach(() => {
    container.define('addBuildingUseCase').asNewable(AddBuildingUseCaseSpy).done()
    container.define(AddBuildingController).asNewable(AddBuildingController).done()
  })

  describe('AddBuilding UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, addBuildingUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(addBuildingUseCaseSpy.dto).toEqual(buildingDto)
    })

    it('should return server error if throws', async () => {
      const { sut, addBuildingUseCaseSpy } = makeSut()
      addBuildingUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })
  })

  it('shold return ok with a new building on body', async () => {
    const { sut, addBuildingUseCaseSpy } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok(addBuildingUseCaseSpy.building))
  })
})
