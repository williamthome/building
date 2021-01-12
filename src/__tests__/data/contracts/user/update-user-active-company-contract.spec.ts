import container from '@/shared/dependency-injection'
import { UpdateUserActiveCompanyContract } from '@/data/contracts'
import { UpdateUserActiveCompanyRepositorySpy } from '@/__tests__/data/__spys__'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: UpdateUserActiveCompanyContract
  updateUserActiveCompanyRepositorySpy: UpdateUserActiveCompanyRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateUserActiveCompanyRepositorySpy = container.resolve<UpdateUserActiveCompanyRepositorySpy>(
    'updateUserActiveCompanyRepository'
  )
  const sut = container.resolve(UpdateUserActiveCompanyContract)
  return {
    sut,
    updateUserActiveCompanyRepositorySpy
  }
}

//#endregion Factories

describe('UpdateUserActiveCompany Contract', () => {
  beforeEach(() => {
    container
      .define('updateUserActiveCompanyRepository')
      .asNewable(UpdateUserActiveCompanyRepositorySpy)
      .done()
    container
      .define(UpdateUserActiveCompanyContract)
      .asNewable(UpdateUserActiveCompanyContract)
      .done()
  })

  describe('UpdateUserActiveCompany Repository', () => {
    it('should be called with right value', async () => {
      const { sut, updateUserActiveCompanyRepositorySpy } = makeSut()
      const id = fakeData.entity.id()
      const activeCompanyId = fakeData.entity.id()
      await sut.call(id, activeCompanyId)
      expect(updateUserActiveCompanyRepositorySpy.id).toEqual(id)
      expect(updateUserActiveCompanyRepositorySpy.activeCompanyId).toEqual(activeCompanyId)
    })

    it('should throw if method throws', async () => {
      const { sut, updateUserActiveCompanyRepositorySpy } = makeSut()
      updateUserActiveCompanyRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id(), fakeData.entity.id())).rejects.toThrow()
    })
  })

  it('shold not throw on update user active company', async () => {
    const { sut } = makeSut()
    await expect(sut.call(fakeData.entity.id(), fakeData.entity.id())).resolves.not.toThrow()
  })
})
