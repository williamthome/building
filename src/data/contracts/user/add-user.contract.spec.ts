import { AddUserContract } from './add-user.contract'
import { AddUserRepositorySpy } from '@/data/__test__/spys/add-user-repository.spy'
import { mockUserModelDto } from '@/data/__test__/mocks/user-model-dto.mock'

//#region Factories

interface SutTypes {
  sut: AddUserContract
  addUserRepositorySpy: AddUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const addUserRepositorySpy = new AddUserRepositorySpy()
  const sut = new AddUserContract(addUserRepositorySpy)
  return {
    sut,
    addUserRepositorySpy
  }
}

//#endregion Factories

describe('AddUser Contract', () => {
  describe('AddUser Repository', () => {
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