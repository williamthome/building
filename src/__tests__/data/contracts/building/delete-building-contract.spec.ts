import container from '@/shared/dependency-injection'
import { DeleteBuildingContract } from '@/data/contracts'
import { DeleteBuildingProjectsRepositorySpy, DeleteBuildingRepositorySpy } from '@/__tests__/data/__spys__'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: DeleteBuildingContract
  deleteBuildingProjectsRepositorySpy: DeleteBuildingProjectsRepositorySpy
  deleteBuildingRepositorySpy: DeleteBuildingRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteBuildingProjectsRepositorySpy = container.resolve<DeleteBuildingProjectsRepositorySpy>('deleteBuildingProjectsRepository')
  const deleteBuildingRepositorySpy = container.resolve<DeleteBuildingRepositorySpy>('deleteBuildingRepository')
  const sut = container.resolve(DeleteBuildingContract)
  return {
    sut,
    deleteBuildingProjectsRepositorySpy,
    deleteBuildingRepositorySpy
  }
}

//#endregion Factories

describe('DeleteBuilding Contract', () => {
  beforeEach(() => {
    container.define('deleteBuildingProjectsRepository').asNewable(DeleteBuildingProjectsRepositorySpy).done()
    container.define('deleteBuildingRepository').asNewable(DeleteBuildingRepositorySpy).done()
    container.define(DeleteBuildingContract).asNewable(DeleteBuildingContract).done()
  })

  describe('DeleteBuildingProjects Repository', () => {
    it('should be called with right value', async () => {
      const { sut, deleteBuildingProjectsRepositorySpy } = makeSut()
      const buildingId = fakeData.entity.id()
      await sut.call(buildingId)
      expect(deleteBuildingProjectsRepositorySpy.buildingId).toEqual(buildingId)
    })

    it('should throw if method throws', async () => {
      const { sut, deleteBuildingProjectsRepositorySpy } = makeSut()
      deleteBuildingProjectsRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id())).rejects.toThrow()
    })
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