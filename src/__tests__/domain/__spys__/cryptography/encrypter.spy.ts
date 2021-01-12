import { Encrypter } from '@/domain/protocols/cryptography'

export class EncrypterSpy implements Encrypter {
  plaintext?: string
  encrypted?: string
  shouldThrow = false

  encrypt = async (plaintext: string): Promise<string> => {
    this.plaintext = plaintext

    if (this.shouldThrow) throw new Error()

    this.encrypted = 'encrypted'
    return this.encrypted
  }
}
