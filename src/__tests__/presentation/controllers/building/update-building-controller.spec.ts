// : Shared
import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
// > In: presentation layer
import { UpdateBuildingController } from '@/presentation/controllers'
import { notFound, ok, serverError } from '@/presentation/factories/http.factory'
import { EntityNotFoundError } from '@/presentation/errors'
import { HttpRequest } from '@/presentation/protocols'
// < Out: only domain layer
import { BuildingDto } from '@/domain/protocols'
import { UpdateBuildingUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { mockBuildingEntityDto } from '@/__tests__/domain/__mocks__/entities'

//#region Factories

const buildingId = fakeData.entity.id()
const buildingDto = mockBuildingEntityDto()
const mockHttpRequest = (): HttpRequest<BuildingDto> => ({
  body: buildingDto,
  params: {
    id: buildingId
  }
})

interface SutTypes {
  sut: UpdateBuildingController
  updateBuildingUseCaseSpy: UpdateBuildingUseCaseSpy
}

const makeSut = (): SutTypes => {
  const updateBuildingUseCaseSpy = container.resolve<UpdateBuildingUseCaseSpy>('updateBuildingUseCase')
  const sut = container.resolve(UpdateBuildingController)
  return {
    sut,
    updateBuildingUseCaseSpy
  }
}

//#endregion Factories

describe('UpdateBuilding Controller', () => {
  beforeEach(() => {
    container.define('updateBuildingUseCase').asNewable(UpdateBuildingUseCaseSpy).done()
    container.define(UpdateBuildingController).asNewable(UpdateBuildingController).done()
  })

  describe('UpdateBuilding UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, updateBuildingUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(updateBuildingUseCaseSpy.buildingId).toEqual(buildingId)
      expect(updateBuildingUseCaseSpy.buildingDto).toEqual(buildingDto)
    })

    it('should return server error if throws', async () => {
      const { sut, updateBuildingUseCaseSpy } = makeSut()
      updateBuildingUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return not found', async () => {
      const { sut, updateBuildingUseCaseSpy } = makeSut()
      updateBuildingUseCaseSpy.shouldReturnNull = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(notFound(new EntityNotFoundError('Building')))
    })
  })

  it('shold return ok with updated building on body', async () => {
    const { sut, updateBuildingUseCaseSpy } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok(updateBuildingUseCaseSpy.buildingEntity))
  })
})