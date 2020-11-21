import container from '@/shared/dependency-injection'
import { GetUserByEmailContract } from '@/data/contracts'
import { GetUserByEmailRepositorySpy } from '@/__tests__/data/__spys__'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: GetUserByEmailContract
  getUserByEmailRepositorySpy: GetUserByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const getUserByEmailRepositorySpy = container.resolve<GetUserByEmailRepositorySpy>('getUserByEmailRepository')
  const sut = container.resolve(GetUserByEmailContract)
  return {
    sut,
    getUserByEmailRepositorySpy
  }
}

//#endregion Factories

describe('GetUserByEmail Contract', () => {
  beforeEach(() => {
    container.define('getUserByEmailRepository').asNewable(GetUserByEmailRepositorySpy).done()
    container.define(GetUserByEmailContract).asNewable(GetUserByEmailContract).done()
  })

  describe('GetUserByEmail Repository', () => {
    it('should be called with right value', async () => {
      const { sut, getUserByEmailRepositorySpy } = makeSut()
      const email = fakeData.person.email()
      const user = await sut.call(email)
      expect(getUserByEmailRepositorySpy.email).toEqual(email)
      expect(getUserByEmailRepositorySpy.userModel).toEqual(user)
    })

    it('should throw if method throws', async () => {
      const { sut, getUserByEmailRepositorySpy } = makeSut()
      getUserByEmailRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.person.email())).rejects.toThrow()
    })

    it('should return null if user not found', async () => {
      const { sut, getUserByEmailRepositorySpy } = makeSut()
      getUserByEmailRepositorySpy.shouldReturnNull = true
      await expect(sut.call(fakeData.person.email())).resolves.toBeNull()
    })
  })

  it('shold return user', async () => {
    const { sut } = makeSut()
    const user = await sut.call(fakeData.person.email())
    expect(user).toBeTruthy()
  })
})