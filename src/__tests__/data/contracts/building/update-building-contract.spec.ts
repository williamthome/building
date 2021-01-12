import container from '@/shared/dependency-injection'
import { UpdateBuildingContract } from '@/data/contracts'
import { UpdateBuildingRepositorySpy } from '@/__tests__/data/__spys__'
import { mockCreateBuildingData } from '@/__tests__/data/__mocks__/models'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: UpdateBuildingContract
  updateBuildingRepositorySpy: UpdateBuildingRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateBuildingRepositorySpy = container.resolve<UpdateBuildingRepositorySpy>(
    'updateBuildingRepository'
  )
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
      const buildingDto = mockCreateBuildingData()
      await sut.call(buildingId, buildingDto)
      expect(updateBuildingRepositorySpy.id).toEqual(buildingId)
      expect(updateBuildingRepositorySpy.dto).toEqual(buildingDto)
    })

    it('should throw if method throws', async () => {
      const { sut, updateBuildingRepositorySpy } = makeSut()
      updateBuildingRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id(), mockCreateBuildingData())).rejects.toThrow()
    })
  })

  it('shold update building', async () => {
    const { sut, updateBuildingRepositorySpy } = makeSut()
    const building = await sut.call(fakeData.entity.id(), mockCreateBuildingData())
    expect(building).toBeTruthy()
    expect(building).toEqual(updateBuildingRepositorySpy.building)
  })
})
