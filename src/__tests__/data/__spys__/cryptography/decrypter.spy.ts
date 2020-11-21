import { Decrypter } from '@/data/protocols/cryptography'

export class DecrypterSpy implements Decrypter {
  ciphertext?: string
  decrypted?: string
  shouldThrow = false

  decrypt = async (ciphertext: string): Promise<string> => {
    this.ciphertext = ciphertext

    if (this.shouldThrow) throw new Error()

    this.decrypted = 'decrypted'
    return this.decrypted
  }
}