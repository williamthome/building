import container from '@/shared/dependency-injection'
import { AddUserContract } from '@/data/contracts'
import { AddUserRepositorySpy, HasherSpy } from '@/__tests__/data/__spys__'
import { mockUserModelDto } from '@/__tests__/data/__mocks__/models'
import { UserDto } from '@/domain/protocols'

//#region Factories

interface SutTypes {
  sut: AddUserContract
  addUserRepositorySpy: AddUserRepositorySpy
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const addUserRepositorySpy = container.resolve<AddUserRepositorySpy>('addUserRepository')
  const hasherSpy = container.resolve<HasherSpy>('hasher')
  const sut = container.resolve(AddUserContract)
  return {
    sut,
    addUserRepositorySpy,
    hasherSpy
  }
}

//#endregion Factories

describe('AddUser Contract', () => {
  beforeEach(() => {
    container.clear()
    container.bind('addUserRepository').asNewable(AddUserRepositorySpy)
    container.bind('hasher').asNewable(HasherSpy)
    container.bind(AddUserContract).asNewable(AddUserContract)
  })

  describe('AddUser Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addUserRepositorySpy, hasherSpy } = makeSut()
      const dto = mockUserModelDto()
      await sut.call(dto)
      const hashedDto: UserDto = {
        ...dto,
        password: hasherSpy.hashed
      }
      expect(addUserRepositorySpy.userDto).toEqual(hashedDto)
    })

    it('should throw if method throws', async () => {
      const { sut, addUserRepositorySpy } = makeSut()
      addUserRepositorySpy.shouldThrow = true
      await expect(sut.call(mockUserModelDto())).rejects.toThrow()
    })
  })

  describe('Hasher', () => {
    it('should be called with right value', async () => {
      const { sut, hasherSpy } = makeSut()
      const dto = mockUserModelDto()
      await sut.call(dto)
      expect(hasherSpy.plaintext).toEqual(dto.password)
    })

    it('should throw if method throws', async () => {
      const { sut, hasherSpy } = makeSut()
      hasherSpy.shouldThrow = true
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