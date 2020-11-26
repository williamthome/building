import container from '@/shared/dependency-injection'
import { UpdateBuildingContract } from '@/data/contracts'
import { UpdateBuildingRepositorySpy } from '@/__tests__/data/__spys__'
import { mockBuildingModelDto } from '@/__tests__/data/__mocks__/models'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: UpdateBuildingContract
  updateBuildingRepositorySpy: UpdateBuildingRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateBuildingRepositorySpy = container.resolve<UpdateBuildingRepositorySpy>('updateBuildingRepository')
  const sut = container.resolve(UpdateBuildingContract)
  return {
    sut,
    updateBuildingRepositorySpy
  }
}

//#endregion Factories

describe('UpdateBuilding Contract', () => {
  beforeEach(() => {
    container.define('updateBuildingRepository').asNewable(UpdateBuildingRepositorySpy).done()
    container.define(UpdateBuildingContract).asNewable(UpdateBuildingContract).done()
  })

  describe('UpdateBuilding Repository', () => {
    it('should be called with right value', async () => {
      const { sut, updateBuildingRepositorySpy } = makeSut()
      const buildingId = fakeData.entity.id()
      const buildingDto = mockBuildingModelDto()
      await sut.call(buildingId, buildingDto)
      expect(updateBuildingRepositorySpy.buildingId).toEqual(buildingId)
      expect(updateBuildingRepositorySpy.buildingDto).toEqual(buildingDto)
    })

    it('should throw if method throws', async () => {
      const { sut, updateBuildingRepositorySpy } = makeSut()
      updateBuildingRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id(), mockBuildingModelDto())).rejects.toThrow()
    })
  })

  it('shold update building', async () => {
    const { sut, updateBuildingRepositorySpy } = makeSut()
    const building = await sut.call(fakeData.entity.id(), mockBuildingModelDto())
    expect(building).toBeTruthy()
    expect(building).toEqual(updateBuildingRepositorySpy.buildingModel)
  })
})