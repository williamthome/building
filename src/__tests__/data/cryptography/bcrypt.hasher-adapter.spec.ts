import bcrypt from 'bcrypt'
import fakeData from '@/__tests__/shared/fake-data'
import { BcryptHasherAdapter } from '@/data/cryptography'

// #region Factory

const plaintext = fakeData.entity.password()
const digest = `${plaintext}_hashed`

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await Promise.resolve(digest)
  },
  async compare(): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

interface SutTypes {
  sut: BcryptHasherAdapter
}

const salt = 12
const makeSut = (): SutTypes => {
  const sut = new BcryptHasherAdapter(salt)
  return {
    sut
  }
}

// #endregion Factory

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call method with right values', async () => {
      const { sut } = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(plaintext)
      expect(hashSpy).toHaveBeenCalledWith(plaintext, salt)
    })

    test('Should returns a hash on method success', async () => {
      const { sut } = makeSut()
      const hash = await sut.hash(plaintext)
      expect(hash).toBe(digest)
    })

    test('Should throw if method throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })
      await expect(sut.hash(plaintext)).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    test('Should call method with right values', async () => {
      const { sut } = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.match(plaintext, plaintext)
      expect(compareSpy).toHaveBeenCalledWith(plaintext, plaintext)
    })

    test('Should returns true on success', async () => {
      const { sut } = makeSut()
      const match = await sut.match(plaintext, plaintext)
      expect(match).toBe(true)
    })

    test('Should returns false on fails', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)
      const match = await sut.match(plaintext, plaintext)
      expect(match).toBe(false)
    })

    test('Should throw if method throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })
      await expect(sut.match(plaintext, plaintext)).rejects.toThrow()
    })
  })
})
