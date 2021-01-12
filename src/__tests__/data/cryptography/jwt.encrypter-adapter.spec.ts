import jwt from 'jsonwebtoken'
import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
import { JwtEncrypterAdapter } from '@/data/cryptography'

// #region Factories

const fakeSecret = fakeData.entity.jwtSecret()
const fakeId = fakeData.entity.id()
const fakeToken = 'encrypted'
const fakeVerifiedToken = { [JwtEncrypterAdapter.key]: 'decrypted' }

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return fakeToken
  },

  verify(): string {
    return fakeVerifiedToken[JwtEncrypterAdapter.key]
  }
}))

interface SutTypes {
  sut: JwtEncrypterAdapter
}

const makeSut = (): SutTypes => {
  const sut = container.resolve<JwtEncrypterAdapter>('encrypter')
  return {
    sut
  }
}

// #endregion Factories

describe('JWT Adapter', () => {
  beforeEach(() => {
    container.define('encrypter').asNewable(JwtEncrypterAdapter).done()
    container.define('decrypter').asNewable(JwtEncrypterAdapter).done()
    container.define('JWT_SECRET').as(fakeSecret).done()
  })

  describe('sign()', () => {
    it('Should call method with right values', async () => {
      const { sut } = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(fakeId)
      expect(signSpy).toHaveBeenCalledWith({ [JwtEncrypterAdapter.key]: fakeId }, fakeSecret)
    })

    it('Should returns a token on success', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.encrypt(fakeId)
      expect(accessToken).toBe(fakeToken)
    })

    it('Should throw if method throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      await expect(sut.encrypt(fakeId)).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    it('Should call method with right values', async () => {
      const { sut } = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt(fakeToken)
      expect(verifySpy).toHaveBeenCalledWith(fakeToken, fakeSecret)
    })

    it('Should returns a decrypted string on success', async () => {
      const { sut } = makeSut()
      const decryptedToken = await sut.decrypt(fakeId)
      expect(decryptedToken).toBe(decryptedToken)
    })

    it('Should throw if method throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      await expect(sut.decrypt(fakeId)).rejects.toThrow()
    })
  })
})
