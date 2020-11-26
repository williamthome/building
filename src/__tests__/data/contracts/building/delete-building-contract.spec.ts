import container from '@/shared/dependency-injection'
import { DeleteBuildingContract } from '@/data/contracts'
import { DeleteBuildingRepositorySpy } from '@/__tests__/data/__spys__'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: DeleteBuildingContract
  deleteBuildingRepositorySpy: DeleteBuildingRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteBuildingRepositorySpy = container.resolve<DeleteBuildingRepositorySpy>('deleteBuildingRepository')
  const sut = container.resolve(DeleteBuildingContract)
  return {
    sut,
    deleteBuildingRepositorySpy
  }
}

//#endregion Factories

describe('DeleteBuilding Contract', () => {
  beforeEach(() => {
    container.define('deleteBuildingRepository').asNewable(DeleteBuildingRepositorySpy).done()
    container.define(DeleteBuildingContract).asNewable(DeleteBuildingContract).done()
  })

  describe('DeleteBuilding Repository', () => {
    it('should be called with right value', async () => {
      const { sut, deleteBuildingRepositorySpy } = makeSut()
      const buildingId = fakeData.entity.id()
      await sut.call(buildingId)
      expect(deleteBuildingRepositorySpy.buildingId).toEqual(buildingId)
    })

    it('should throw if method throws', async () => {
      const { sut, deleteBuildingRepositorySpy } = makeSut()
      deleteBuildingRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id())).rejects.toThrow()
    })
  })

  it('shold delete building', async () => {
    const { sut, deleteBuildingRepositorySpy } = makeSut()
    const building = await sut.call(fakeData.entity.id())
    expect(building).toBeTruthy()
    expect(building).toEqual(deleteBuildingRepositorySpy.buildingModel)
  })
})