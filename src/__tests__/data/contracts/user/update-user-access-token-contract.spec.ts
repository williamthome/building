import container from '@/shared/dependency-injection'
import { UpdateUserAccessTokenContract } from '@/data/contracts'
import { UpdateUserAccessTokenRepositorySpy } from '@/__tests__/data/__spys__'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

const id = fakeData.entity.id()
const accessToken = fakeData.entity.token(id, fakeData.entity.jwtSecret())

interface SutTypes {
  sut: UpdateUserAccessTokenContract
  updateUserAccessTokenRepositorySpy: UpdateUserAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateUserAccessTokenRepositorySpy = container.resolve<UpdateUserAccessTokenRepositorySpy>('updateUserAccessTokenRepository')
  const sut = container.resolve(UpdateUserAccessTokenContract)
  return {
    sut,
    updateUserAccessTokenRepositorySpy
  }
}

//#endregion Factories

describe('UpdateUserAccessToken Contract', () => {
  beforeEach(() => {
    container.define('updateUserAccessTokenRepository').asNewable(UpdateUserAccessTokenRepositorySpy).done()
    container.define(UpdateUserAccessTokenContract).asNewable(UpdateUserAccessTokenContract).done()
  })

  describe('UpdateUserAccessToken Repository', () => {
    it('should be called with right value', async () => {
      const { sut, updateUserAccessTokenRepositorySpy } = makeSut()
      await sut.call(id, accessToken)
      expect(updateUserAccessTokenRepositorySpy.id).toEqual(id)
      expect(updateUserAccessTokenRepositorySpy.accessToken).toEqual(accessToken)
    })

    it('should throw if method throws', async () => {
      const { sut, updateUserAccessTokenRepositorySpy } = makeSut()
      updateUserAccessTokenRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id(), accessToken)).rejects.toThrow()
    })
  })

  it('shold not throw on update user access token', async () => {
    const { sut } = makeSut()
    await expect(sut.call(id, accessToken)).resolves.not.toThrow()
  })
})