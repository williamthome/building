import container from '@/shared/dependency-injection'
import { AddUserContract } from '@/data/contracts'
import { AddUnverifiedRepositorySpy, AddUserRepositorySpy, HasherSpy } from '@/__tests__/data/__spys__'
import { mockUserModelDto } from '@/__tests__/data/__mocks__/models'
import { ModelDto } from '@/data/protocols'
import { UserModel } from '@/data/models'

//#region Factories

interface SutTypes {
  sut: AddUserContract
  hasherSpy: HasherSpy
  addUserRepositorySpy: AddUserRepositorySpy
  addUnverifiedRepositorySpy: AddUnverifiedRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = container.resolve<HasherSpy>('hasher')
  const addUserRepositorySpy = container.resolve<AddUserRepositorySpy>('addUserRepository')
  const addUnverifiedRepositorySpy = container.resolve<AddUnverifiedRepositorySpy>('addUnverifiedRepository')
  const sut = container.resolve(AddUserContract)
  return {
    sut,
    hasherSpy,
    addUserRepositorySpy,
    addUnverifiedRepositorySpy
  }
}

//#endregion Factories

describe('AddUser Contract', () => {
  beforeEach(() => {
    container.define('hasher').asNewable(HasherSpy).done()
    container.define('addUserRepository').asNewable(AddUserRepositorySpy).done()
    container.define('addUnverifiedRepository').asNewable(AddUnverifiedRepositorySpy).done()
    container.define(AddUserContract).asNewable(AddUserContract).done()
  })

  describe('AddUser Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addUserRepositorySpy, hasherSpy } = makeSut()
      const dto = mockUserModelDto()
      await sut.call(dto)
      const hashedDto: ModelDto<UserModel> = {
        ...dto,
        password: hasherSpy.hashed[0],
        verified: false
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
      expect(hasherSpy.plaintext[0]).toEqual(dto.password)
    })

    it('should throw if method throws', async () => {
      const { sut, hasherSpy } = makeSut()
      hasherSpy.shouldThrow = true
      await expect(sut.call(mockUserModelDto())).rejects.toThrow()
    })
  })

  describe('AddUnverified Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addUnverifiedRepositorySpy, hasherSpy } = makeSut()
      await sut.call(mockUserModelDto())
      expect(addUnverifiedRepositorySpy.unverifiedDto?.token).toEqual(hasherSpy.hashed[1])
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