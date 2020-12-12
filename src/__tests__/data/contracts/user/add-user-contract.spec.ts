import container from '@/shared/dependency-injection'
import { AddUserContract } from '@/data/contracts'
import { UserData, CreateUserData } from '@/data/models'
import { AddUnverifiedRepositorySpy, AddUserRepositorySpy, HasherSpy } from '@/__tests__/data/__spys__'
import { mockCreateUserData } from '@/__tests__/data/__mocks__/models'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { EncrypterSpy } from '@/__tests__/domain/__spys__/cryptography'

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
      const dto = mockCreateUserData()
      await sut.call(dto)
      expect(hasherSpy.plaintext).toEqual(dto.password)
    })

    it('should throw if method throws', async () => {
      const { sut, hasherSpy } = makeSut()
      hasherSpy.shouldThrow = true
      await expect(sut.call(mockCreateUserData())).rejects.toThrow()
    })
  })

  describe('AddUser Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addUserRepositorySpy, hasherSpy } = makeSut()
      const dto = mockCreateUserData()
      await sut.call(dto)
      const hashedDto: CreateUserData = {
        ...dto,
        password: hasherSpy.hashed as string,
        verified: false
      }
      expect(addUserRepositorySpy.dto).toEqual(hashedDto)
    })

    it('should throw if method throws', async () => {
      const { sut, addUserRepositorySpy } = makeSut()
      addUserRepositorySpy.shouldThrow = true
      await expect(sut.call(mockCreateUserData())).rejects.toThrow()
    })
  })

  describe('Encrypter', () => {
    it('should be called with right value', async () => {
      const { sut, encrypterSpy, addUserRepositorySpy } = makeSut()
      const dto = mockCreateUserData()
      await sut.call(dto)
      expect(encrypterSpy.plaintext).toEqual(addUserRepositorySpy.user?.id)
    })

    it('should throw if method throws', async () => {
      const { sut, encrypterSpy } = makeSut()
      encrypterSpy.shouldThrow = true
      await expect(sut.call(mockCreateUserData())).rejects.toThrow()
    })
  })

  describe('AddUnverified Repository', () => {
    it('should be called with right value', async () => {
      const { sut, addUnverifiedRepositorySpy, addUserRepositorySpy } = makeSut()
      await sut.call(mockCreateUserData())
      expect(addUnverifiedRepositorySpy.dto?.userId).toEqual(addUserRepositorySpy.user?.id)
    })

    it('should throw if method throws', async () => {
      const { sut, hasherSpy } = makeSut()
      hasherSpy.shouldThrow = true
      await expect(sut.call(mockCreateUserData())).rejects.toThrow()
    })
  })

  it('shold return a new user', async () => {
    const { sut, addUserRepositorySpy, encrypterSpy } = makeSut()
    const response = await sut.call(mockCreateUserData())
    expect(response.user).toEqual(userWithoutPassword(addUserRepositorySpy.user as UserData))
    expect(response.verificationToken).toBe(encrypterSpy.encrypted)
  })
})