import container from '@/shared/dependency-injection'
import { GetUserByAccessTokenContract } from '@/data/contracts'
import { GetUserByAccessTokenRepositorySpy } from '@/__tests__/data/__spys__'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

interface SutTypes {
  sut: GetUserByAccessTokenContract
  getUserByAccessTokenRepositorySpy: GetUserByAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const getUserByAccessTokenRepositorySpy = container.resolve<GetUserByAccessTokenRepositorySpy>('getUserByAccessTokenRepository')
  const sut = container.resolve(GetUserByAccessTokenContract)
  return {
    sut,
    getUserByAccessTokenRepositorySpy
  }
}

//#endregion Factories

describe('GetUserByAccessToken Contract', () => {
  beforeEach(() => {
    container.clear()
    container.bind('getUserByAccessTokenRepository').asNewable(GetUserByAccessTokenRepositorySpy)
    container.bind(GetUserByAccessTokenContract).asNewable(GetUserByAccessTokenContract)
  })

  describe('GetUserByAccessToken Repository', () => {
    it('should be called with right value', async () => {
      const { sut, getUserByAccessTokenRepositorySpy } = makeSut()
      const accessToken = fakeData.entity.token()
      const user = await sut.call(accessToken)
      expect(getUserByAccessTokenRepositorySpy.accessToken).toEqual(accessToken)
      expect(getUserByAccessTokenRepositorySpy.userModel).toEqual(user)
    })

    it('should throw if method throws', async () => {
      const { sut, getUserByAccessTokenRepositorySpy } = makeSut()
      getUserByAccessTokenRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.token())).rejects.toThrow()
    })

    it('should return null if user not found', async () => {
      const { sut, getUserByAccessTokenRepositorySpy } = makeSut()
      getUserByAccessTokenRepositorySpy.shouldReturnNull = true
      await expect(sut.call(fakeData.entity.token())).resolves.toBeNull()
    })
  })

  it('shold return user', async () => {
    const { sut } = makeSut()
    const user = await sut.call(fakeData.entity.token())
    expect(user).toBeTruthy()
  })
})