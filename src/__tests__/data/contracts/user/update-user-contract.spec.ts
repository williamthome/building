import container from '@/shared/dependency-injection'
import { UpdateUserContract } from '@/data/contracts'
import { UpdateUserRepositorySpy } from '@/__tests__/data/__spys__'
import { mockUserModelDto } from '@/__tests__/data/__mocks__/models'
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
    container.clear()
    container.bind('updateUserRepository').asNewable(UpdateUserRepositorySpy)
    container.bind(UpdateUserContract).asNewable(UpdateUserContract)
  })

  describe('UpdateUser Repository', () => {
    it('should be called with right value', async () => {
      const { sut, updateUserRepositorySpy } = makeSut()
      const userId = fakeData.entity.id()
      const userDto = mockUserModelDto()
      await sut.call(userId, userDto)
      expect(updateUserRepositorySpy.userId).toEqual(userId)
      expect(updateUserRepositorySpy.userDto).toEqual(userDto)
    })

    it('should throw if method throws', async () => {
      const { sut, updateUserRepositorySpy } = makeSut()
      updateUserRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id(), mockUserModelDto())).rejects.toThrow()
    })
  })

  it('shold update user', async () => {
    const { sut, updateUserRepositorySpy } = makeSut()
    const user = await sut.call(fakeData.entity.id(), mockUserModelDto())
    expect(user).toBeTruthy()
    expect(user).toEqual(updateUserRepositorySpy.userModel)
  })
})