import container from '@/shared/dependency-injection'
import { UpdateUserContract } from '@/data/contracts'
import { UpdateUserRepositorySpy } from '@/__tests__/data/__spys__'
import { mockCreateUserData } from '@/__tests__/data/__mocks__/models'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: UpdateUserContract
  updateUserRepositorySpy: UpdateUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateUserRepositorySpy = container.resolve<UpdateUserRepositorySpy>('updateUserRepository')
  const sut = container.resolve(UpdateUserContract)
  return {
    sut,
    updateUserRepositorySpy
  }
}

//#endregion Factories

describe('UpdateUser Contract', () => {
  beforeEach(() => {
    container.define('updateUserRepository').asNewable(UpdateUserRepositorySpy).done()
    container.define(UpdateUserContract).asNewable(UpdateUserContract).done()
  })

  describe('UpdateUser Repository', () => {
    it('should be called with right value', async () => {
      const { sut, updateUserRepositorySpy } = makeSut()
      const userId = fakeData.entity.id()
      const userDto = mockCreateUserData()
      await sut.call(userId, userDto)
      expect(updateUserRepositorySpy.id).toEqual(userId)
      expect(updateUserRepositorySpy.dto).toEqual(userDto)
    })

    it('should throw if method throws', async () => {
      const { sut, updateUserRepositorySpy } = makeSut()
      updateUserRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id(), mockCreateUserData())).rejects.toThrow()
    })
  })

  it('shold update user', async () => {
    const { sut, updateUserRepositorySpy } = makeSut()
    const user = await sut.call(fakeData.entity.id(), mockCreateUserData())
    expect(user).toBeTruthy()
    expect(user).toEqual(updateUserRepositorySpy.user)
  })
})
