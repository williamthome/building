import container from '@/shared/dependency-injection'
import { AddUserContract } from '@/data/contracts/user/add-user.contract'
import { AddUserRepositorySpy } from '@/__tests__/data/__spys__/add-user-repository.spy'
import { mockUserModelDto } from '@/__tests__/data/__mocks__/user-model-dto.mock'

//#region Factories

interface SutTypes {
  sut: AddUserContract
  addUserRepositorySpy: AddUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const addUserRepositorySpy = container.resolve<AddUserRepositorySpy>('addUserRepository')
  const sut = container.resolve(AddUserContract)
  return {
    sut,
    addUserRepositorySpy
  }
}

//#endregion Factories

describe('AddUser Contract', () => {
  beforeEach(() => {
    container.clear()
    container.bind('addUserRepository').asNewable(AddUserRepositorySpy)
    container.bind(AddUserContract).asNewable(AddUserContract)
  })

  describe('AddUser Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addUserRepositorySpy } = makeSut()
      const dto = mockUserModelDto()
      await sut.call(dto)
      expect(addUserRepositorySpy.userDto).toEqual(dto)
    })

    it('should throw if method throws', async () => {
      const { sut, addUserRepositorySpy } = makeSut()
      addUserRepositorySpy.shouldThrow = true
      await expect(sut.call(mockUserModelDto())).rejects.toThrow()
    })
  })

  it('shold return a new user', async () => {
    const { sut, addUserRepositorySpy } = makeSut()
    const user = await sut.call(mockUserModelDto())
    expect(user).toBeTruthy()
    expect(user).toEqual(addUserRepositorySpy.userModel)
  })
})