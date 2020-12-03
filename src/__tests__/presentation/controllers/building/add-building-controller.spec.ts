import fakeData from '@/__tests__/shared/fake-data'
import container from '@/shared/dependency-injection'
import { CollectionName } from '@/shared/types'
// > In: presentation layer
import { AddBuildingController } from '@/presentation/controllers'
import { forbidden, ok, serverError } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
// < Out: only domain layer
import { AddBuildingUseCaseSpy, GetEntityCountForPlanLimitUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { mockBuildingEntityDto, mockPlanEntity } from '@/__tests__/domain/__mocks__/entities'
import { BuildingEntity } from '@/domain/entities'
import { PlanLimitExceededError } from '@/presentation/errors'

//#region Factories

const collectionName: CollectionName = 'buildings'
const companyId = fakeData.entity.id()
const buildingDto = mockBuildingEntityDto(companyId)
const plan = mockPlanEntity()
const mockHttpRequest = (
  { buildingLimit }: { buildingLimit?: number } = {}
): HttpRequest<Partial<Omit<BuildingEntity, 'id'>>> => ({
  body: buildingDto,
  activeCompanyInfo: {
    id: companyId,
    limit: buildingLimit !== undefined
      ? {
        building: buildingLimit,
        member: 1,
        customer: 1,
        phase: 1,
        property: 1,
        technician: 1,
        project: 1,
        storage: 0
      }
      : plan.limit
  }
})

interface SutTypes {
  sut: AddBuildingController
  getEntityCountForPlanLimitUseCaseSpy: GetEntityCountForPlanLimitUseCaseSpy
  addBuildingUseCaseSpy: AddBuildingUseCaseSpy
}

const makeSut = (): SutTypes => {
  const getEntityCountForPlanLimitUseCaseSpy = container.resolve<GetEntityCountForPlanLimitUseCaseSpy>('getEntityCountForPlanLimitUseCase')
  const addBuildingUseCaseSpy = container.resolve<AddBuildingUseCaseSpy>('addBuildingUseCase')
  const sut = container.resolve(AddBuildingController)
  return {
    sut,
    getEntityCountForPlanLimitUseCaseSpy,
    addBuildingUseCaseSpy
  }
}

//#endregion Factories

describe('AddBuilding Controller', () => {
  beforeEach(() => {
    container.define('getEntityCountForPlanLimitUseCase').asNewable(GetEntityCountForPlanLimitUseCaseSpy).done()
    container.define('addBuildingUseCase').asNewable(AddBuildingUseCaseSpy).done()
    container.define(AddBuildingController).asNewable(AddBuildingController).done()
  })

  describe('GetEntityCountForPlanLimit UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getEntityCountForPlanLimitUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest({ buildingLimit: 1 }))
      expect(getEntityCountForPlanLimitUseCaseSpy.reference).toEqual(collectionName)
      expect(getEntityCountForPlanLimitUseCaseSpy.companyId).toEqual(buildingDto.companyId)
    })

    it('should return server error if throws', async () => {
      const { sut, getEntityCountForPlanLimitUseCaseSpy } = makeSut()
      getEntityCountForPlanLimitUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest({ buildingLimit: 1 }))
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return plan limit exceeded', async () => {
      const { sut } = makeSut()
      const response = await sut.handle(mockHttpRequest({ buildingLimit: 0 }))
      expect(response).toEqual(forbidden(new PlanLimitExceededError('buildings')))
    })
  })

  describe('AddBuilding UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, addBuildingUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(addBuildingUseCaseSpy.buildingDto).toEqual(buildingDto)
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
    expect(response).toEqual(ok(addBuildingUseCaseSpy.buildingEntity))
  })
})