import container from '@/shared/dependency-injection'
import { AddBuildingContract } from '@/data/contracts'
import { AddBuildingRepositorySpy } from '@/__tests__/data/__spys__'
import { mockBuildingModelDto } from '@/__tests__/data/__mocks__/models'
import fakeData from '@/__tests__/shared/fake-data'
import { BuildingModelDto } from '@/data/protocols'

//#region Factories

interface SutTypes {
  sut: AddBuildingContract
  addBuildingRepositorySpy: AddBuildingRepositorySpy
}

const makeSut = (): SutTypes => {
  const addBuildingRepositorySpy = container.resolve<AddBuildingRepositorySpy>('addBuildingRepository')
  const sut = container.resolve(AddBuildingContract)
  return {
    sut,
    addBuildingRepositorySpy
  }
}

//#endregion Factories

describe('AddBuilding Contract', () => {
  beforeEach(() => {
    container.define('addBuildingRepository').asNewable(AddBuildingRepositorySpy).done()
    container.define(AddBuildingContract).asNewable(AddBuildingContract).done()
  })

  describe('AddBuilding Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addBuildingRepositorySpy } = makeSut()
      const dto = mockBuildingModelDto()
      const id = fakeData.entity.id()
      await sut.call(dto, id)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { companyId, ...buildingDto } = addBuildingRepositorySpy.buildingDto as BuildingModelDto
      expect(buildingDto).toEqual(dto)
    })

    it('should throw if method throws', async () => {
      const { sut, addBuildingRepositorySpy } = makeSut()
      addBuildingRepositorySpy.shouldThrow = true
      await expect(sut.call(mockBuildingModelDto(), fakeData.entity.id())).rejects.toThrow()
    })
  })

  it('shold return a new building', async () => {
    const { sut, addBuildingRepositorySpy } = makeSut()
    const building = await sut.call(mockBuildingModelDto(), fakeData.entity.id())
    expect(building).toBeTruthy()
    expect(building).toEqual(addBuildingRepositorySpy.buildingModel)
  })
})