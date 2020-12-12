import container from '@/shared/dependency-injection'
import { DeleteBuildingContract } from '@/data/contracts'
import {
  DeleteBuildingPhasesRepositorySpy,
  DeleteBuildingProjectsRepositorySpy,
  DeleteBuildingRepositorySpy
} from '@/__tests__/data/__spys__'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: DeleteBuildingContract
  deleteBuildingProjectsRepositorySpy: DeleteBuildingProjectsRepositorySpy
  deleteBuildingPhasesRepositorySpy: DeleteBuildingPhasesRepositorySpy
  deleteBuildingRepositorySpy: DeleteBuildingRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteBuildingProjectsRepositorySpy = container.resolve<DeleteBuildingProjectsRepositorySpy>('deleteBuildingProjectsRepository')
  const deleteBuildingPhasesRepositorySpy = container.resolve<DeleteBuildingPhasesRepositorySpy>('deleteBuildingPhasesRepository')
  const deleteBuildingRepositorySpy = container.resolve<DeleteBuildingRepositorySpy>('deleteBuildingRepository')
  const sut = container.resolve(DeleteBuildingContract)
  return {
    sut,
    deleteBuildingProjectsRepositorySpy,
    deleteBuildingPhasesRepositorySpy,
    deleteBuildingRepositorySpy
  }
}

//#endregion Factories

describe('DeleteBuilding Contract', () => {
  beforeEach(() => {
    container.define('deleteBuildingProjectsRepository').asNewable(DeleteBuildingProjectsRepositorySpy).done()
    container.define('deleteBuildingPhasesRepository').asNewable(DeleteBuildingPhasesRepositorySpy).done()
    container.define('deleteBuildingRepository').asNewable(DeleteBuildingRepositorySpy).done()
    container.define(DeleteBuildingContract).asNewable(DeleteBuildingContract).done()
  })

  describe('DeleteBuildingProjects Repository', () => {
    it('should be called with right value', async () => {
      const { sut, deleteBuildingProjectsRepositorySpy } = makeSut()
      const buildingId = fakeData.entity.id()
      await sut.call(buildingId)
      expect(deleteBuildingProjectsRepositorySpy.id).toEqual(buildingId)
    })

    it('should throw if method throws', async () => {
      const { sut, deleteBuildingProjectsRepositorySpy } = makeSut()
      deleteBuildingProjectsRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id())).rejects.toThrow()
    })
  })

  describe('DeleteBuildingPhases Repository', () => {
    it('should be called with right value', async () => {
      const { sut, deleteBuildingPhasesRepositorySpy } = makeSut()
      const buildingId = fakeData.entity.id()
      await sut.call(buildingId)
      expect(deleteBuildingPhasesRepositorySpy.id).toEqual(buildingId)
    })

    it('should throw if method throws', async () => {
      const { sut, deleteBuildingPhasesRepositorySpy } = makeSut()
      deleteBuildingPhasesRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id())).rejects.toThrow()
    })
  })

  describe('DeleteBuilding Repository', () => {
    it('should be called with right value', async () => {
      const { sut, deleteBuildingRepositorySpy } = makeSut()
      const buildingId = fakeData.entity.id()
      await sut.call(buildingId)
      expect(deleteBuildingRepositorySpy.id).toEqual(buildingId)
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
    expect(building).toEqual(deleteBuildingRepositorySpy.building)
  })
})