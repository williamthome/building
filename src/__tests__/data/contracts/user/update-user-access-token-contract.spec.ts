import container from '@/shared/dependency-injection'
import { UpdateUserAccessTokenContract } from '@/data/contracts'
import { UpdateUserAccessTokenRepositorySpy } from '@/__tests__/data/__spys__'
import fakeData from '@/__tests__/shared/fake-data'

//#region Factories

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
      const id = fakeData.entity.id()
      const accessToken = fakeData.entity.token()
      await sut.call(id, accessToken)
      expect(updateUserAccessTokenRepositorySpy.id).toEqual(id)
      expect(updateUserAccessTokenRepositorySpy.accessToken).toEqual(accessToken)
    })

    it('should throw if method throws', async () => {
      const { sut, updateUserAccessTokenRepositorySpy } = makeSut()
      updateUserAccessTokenRepositorySpy.shouldThrow = true
      await expect(sut.call(fakeData.entity.id(), fakeData.entity.token())).rejects.toThrow()
    })
  })

  it('shold not throw on update user access token', async () => {
    const { sut } = makeSut()
    await expect(sut.call(fakeData.entity.id(), fakeData.entity.token())).resolves.not.toThrow()
  })
})