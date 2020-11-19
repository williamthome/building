import jwt from 'jsonwebtoken'
// : Shared
import fakeData from '../../shared/fake-data'
// > In: infra layer
import { JwtAdapter } from '@/infra/cryptography'
// < Out: only data layer

// #region Factories

const fakeSecret = 'jwtSecret'
const fakeToken = fakeData.entity.token()
const fakeVerifiedToken = fakeData.entity.token()
const fakeId = fakeData.entity.id()

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return fakeToken
  },

  // eslint-disable-next-line @typescript-eslint/ban-types
  verify (): string | object {
    return fakeVerifiedToken
  }
}))

interface SutTypes {
  sut: JwtAdapter
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter(fakeSecret)
  return {
    sut
  }
}

// #endregion Factories

describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('Should call method with right values', async () => {
      const { sut } = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(fakeId)
      expect(signSpy).toHaveBeenCalledWith({ id: fakeId }, fakeSecret)
    })

    test('Should returns a token on success', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.encrypt(fakeId)
      expect(accessToken).toBe(fakeToken)
    })

    test('Should throw if method throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
      await expect(sut.encrypt(fakeId)).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call method with right values', async () => {
      const { sut } = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt(fakeToken)
      expect(verifySpy).toHaveBeenCalledWith(fakeToken, fakeSecret)
    })

    test('Should returns a decrypted string on success', async () => {
      const { sut } = makeSut()
      const decryptedToken = await sut.decrypt(fakeId)
      expect(decryptedToken).toBe(decryptedToken)
    })

    test('Should throw if method throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
      await expect(sut.decrypt(fakeId)).rejects.toThrow()
    })
  })
})