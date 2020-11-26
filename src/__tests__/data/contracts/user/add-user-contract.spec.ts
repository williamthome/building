import container from '@/shared/dependency-injection'
import { AddUserContract } from '@/data/contracts'
import { AddUnverifiedRepositorySpy, AddUserRepositorySpy, EncrypterSpy, HasherSpy } from '@/__tests__/data/__spys__'
import { mockUserModelDto } from '@/__tests__/data/__mocks__/models'
import { ModelDto } from '@/data/protocols'
import { UserModel } from '@/data/models'

//#region Factories

interface SutTypes {
  sut: AddUserContract
  hasherSpy: HasherSpy
  addUserRepositorySpy: AddUserRepositorySpy
  encrypterSpy: EncrypterSpy
  addUnverifiedRepositorySpy: AddUnverifiedRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = container.resolve<HasherSpy>('hasher')
  const addUserRepositorySpy = container.resolve<AddUserRepositorySpy>('addUserRepository')
  const encrypterSpy = container.resolve<EncrypterSpy>('encrypter')
  const addUnverifiedRepositorySpy = container.resolve<AddUnverifiedRepositorySpy>('addUnverifiedRepository')
  const sut = container.resolve(AddUserContract)
  return {
    sut,
    hasherSpy,
    addUserRepositorySpy,
    encrypterSpy,
    addUnverifiedRepositorySpy
  }
}

//#endregion Factories

describe('AddUser Contract', () => {
  beforeEach(() => {
    container.define('hasher').asNewable(HasherSpy).done()
    container.define('addUserRepository').asNewable(AddUserRepositorySpy).done()
    container.define('encrypter').asNewable(EncrypterSpy).done()
    container.define('addUnverifiedRepository').asNewable(AddUnverifiedRepositorySpy).done()
    container.define(AddUserContract).asNewable(AddUserContract).done()
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

  describe('AddUser Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addUserRepositorySpy, hasherSpy } = makeSut()
      const dto = mockUserModelDto()
      await sut.call(dto)
      const hashedDto: ModelDto<UserModel> = {
        ...dto,
        password: hasherSpy.hashed,
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

  describe('Encrypter', () => {
    it('should be called with right value', async () => {
      const { sut, encrypterSpy, addUserRepositorySpy } = makeSut()
      const dto = mockUserModelDto()
      await sut.call(dto)
      expect(encrypterSpy.plaintext).toEqual(addUserRepositorySpy.userModel?.id)
    })

    it('should throw if method throws', async () => {
      const { sut, encrypterSpy } = makeSut()
      encrypterSpy.shouldThrow = true
      await expect(sut.call(mockUserModelDto())).rejects.toThrow()
    })
  })

  describe('AddUnverified Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addUnverifiedRepositorySpy, addUserRepositorySpy } = makeSut()
      await sut.call(mockUserModelDto())
      expect(addUnverifiedRepositorySpy.unverifiedDto?.userId).toEqual(addUserRepositorySpy.userModel?.id)
    })

    it('should throw if method throws', async () => {
      const { sut, hasherSpy } = makeSut()
      hasherSpy.shouldThrow = true
      await expect(sut.call(mockUserModelDto())).rejects.toThrow()
    })
  })

  it('shold return a new user', async () => {
    const { sut, addUserRepositorySpy, encrypterSpy } = makeSut()
    const response = await sut.call(mockUserModelDto())
    expect(response.user).toEqual(addUserRepositorySpy.userModel)
    expect(response.verificationToken).toBe(encrypterSpy.encrypted)
  })
})