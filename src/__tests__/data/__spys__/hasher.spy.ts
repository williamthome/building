import { Hasher } from '@/data/protocols/cryptography'

export class HasherSpy implements Hasher {
  plaintext?: string
  hashed?: string
  shouldThrow = false

  hash = async (plaintext: string): Promise<string> => {
    this.plaintext = plaintext

    if (this.shouldThrow) throw new Error()

    this.hashed = `${plaintext}_hashed`
    return this.hashed
  }
}