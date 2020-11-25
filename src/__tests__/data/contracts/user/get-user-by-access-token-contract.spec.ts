import container from '@/shared/dependency-injection'
import { GetUserByAccessTokenContract } from '@/data/contracts'
import { DecrypterSpy, GetUserByIdRepositorySpy } from '@/__tests__/data/__spys__'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

const fakeSecret = fakeData.entity.jwtSecret()
const fakeId = fakeData.entity.id()

interface SutTypes {
  sut: GetUserByAccessTokenContract
  decrypterSpy: DecrypterSpy
  getUserByIdRepositorySpy: GetUserByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = container.resolve<DecrypterSpy>('decrypter')
  const getUserByIdRepositorySpy = container.resolve<GetUserByIdRepositorySpy>('getUserByIdRepository')
  const sut = container.resolve(GetUserByAccessTokenContract)
  return {
    sut,
    decrypterSpy,
    getUserByIdRepositorySpy
  }
}

//#endregion Factories

describe('GetUserByAccessToken Contract', () => {
  beforeEach(() => {
    container.define('decrypter').asNewable(DecrypterSpy).done()
    container.define('getUserByIdRepository').asNewable(GetUserByIdRepositorySpy).done()
    container.define(GetUserByAccessTokenContract).asNewable(GetUserByAccessTokenContract).done()
    container.define('JWT_SECRET').as(fakeSecret).done()
  })

  describe('Decrypter', () => {
    it('should be called with right value', async () => {
      const { sut, decrypterSpy } = makeSut()
      const id = fakeData.entity.id()
      const accessToken = fakeData.entity.token(fakeId, fakeSecret)
      await sut.call(accessToken)
      expect(decrypterSpy.ciphertext).toEqual(accessToken)
    })

    it('should throw if method throws', async () => {
      const { sut, decrypterSpy } = makeSut()
      decrypterSpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.token(fakeId, fakeSecret))).rejects.toThrow()
    })
  })

  describe('GetUserById Repository', () => {
    it('should be called with right value', async () => {
      const { sut, getUserByIdRepositorySpy, decrypterSpy } = makeSut()
      const id = fakeData.entity.id()
      getUserByIdRepositorySpy.override = { id }
      await sut.call(fakeData.entity.token(fakeId, fakeSecret))
      expect(getUserByIdRepositorySpy.id).toEqual(decrypterSpy.decrypted)
    })

    it('should throw if method throws', async () => {
      const { sut, getUserByIdRepositorySpy } = makeSut()
      getUserByIdRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.token(fakeId, fakeSecret))).rejects.toThrow()
    })

    it('should return null if user not found', async () => {
      const { sut, getUserByIdRepositorySpy } = makeSut()
      getUserByIdRepositorySpy.shouldReturnNull = true
      await expect(sut.call(fakeData.entity.token(fakeId, fakeSecret))).resolves.toBeNull()
    })
  })

  it('shold return user', async () => {
    const { sut } = makeSut()
    const user = await sut.call(fakeData.entity.token(fakeId, fakeSecret))
    expect(user).toBeTruthy()
  })
})