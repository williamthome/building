import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
import { AddBuildingContract } from '@/data/contracts'
import { AddBuildingRepositorySpy } from '@/__tests__/data/__spys__'
import { mockCreateBuildingData } from '@/__tests__/data/__mocks__/models'

//#region Factories

interface SutTypes {
  sut: AddBuildingContract
  addBuildingRepositorySpy: AddBuildingRepositorySpy
}

const makeSut = (): SutTypes => {
  const addBuildingRepositorySpy = container.resolve<AddBuildingRepositorySpy>(
    'addBuildingRepository'
  )
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
      const dto = mockCreateBuildingData()
      const activeCompanyId = fakeData.entity.id()
      await sut.call(dto, activeCompanyId)
      dto.companyId = activeCompanyId
      expect(addBuildingRepositorySpy.dto).toEqual(dto)
    })

    it('should throw if method throws', async () => {
      const { sut, addBuildingRepositorySpy } = makeSut()
      addBuildingRepositorySpy.shouldThrow = true
      await expect(sut.call(mockCreateBuildingData(), fakeData.entity.id())).rejects.toThrow()
    })
  })

  it('shold return a new building', async () => {
    const { sut, addBuildingRepositorySpy } = makeSut()
    const building = await sut.call(mockCreateBuildingData(), fakeData.entity.id())
    expect(building).toBeTruthy()
    expect(building).toEqual(addBuildingRepositorySpy.building)
  })
})
