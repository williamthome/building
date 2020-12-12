// : Shared
import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
// > In: presentation layer
import { DeleteBuildingController } from '@/presentation/controllers'
import { notFound, ok, serverError } from '@/presentation/factories/http.factory'
import { EntityNotFoundError } from '@/presentation/errors'
import { HttpRequest } from '@/presentation/protocols'
// < Out: only domain layer
import { DeleteBuildingUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'

//#region Factories

const buildingId = fakeData.entity.id()
const mockHttpRequest = (): HttpRequest => ({
  params: {
    id: buildingId
  }
})

interface SutTypes {
  sut: DeleteBuildingController
  deleteBuildingUseCaseSpy: DeleteBuildingUseCaseSpy
}

const makeSut = (): SutTypes => {
  const deleteBuildingUseCaseSpy = container.resolve<DeleteBuildingUseCaseSpy>('deleteBuildingUseCase')
  const sut = container.resolve(DeleteBuildingController)
  return {
    sut,
    deleteBuildingUseCaseSpy
  }
}

//#endregion Factories

describe('DeleteBuilding Controller', () => {
  beforeEach(() => {
    container.define('deleteBuildingUseCase').asNewable(DeleteBuildingUseCaseSpy).done()
    container.define(DeleteBuildingController).asNewable(DeleteBuildingController).done()
  })

  describe('DeleteBuilding UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, deleteBuildingUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(deleteBuildingUseCaseSpy.id).toEqual(buildingId)
    })

    it('should return server error if throws', async () => {
      const { sut, deleteBuildingUseCaseSpy } = makeSut()
      deleteBuildingUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return not found', async () => {
      const { sut, deleteBuildingUseCaseSpy } = makeSut()
      deleteBuildingUseCaseSpy.shouldReturnNull = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(notFound(new EntityNotFoundError('Building')))
    })
  })

  it('shold return ok with deleted building on body', async () => {
    const { sut, deleteBuildingUseCaseSpy } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok(deleteBuildingUseCaseSpy.building))
  })
})