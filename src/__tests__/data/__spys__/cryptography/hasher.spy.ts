import { Hasher } from '@/data/protocols/cryptography'

export class HasherSpy implements Hasher {
  plaintext: string[] = []
  hashed: string[] = []
  shouldThrow = false

  hash = async (plaintext: string): Promise<string> => {
    this.plaintext.push(plaintext)

    if (this.shouldThrow) throw new Error()

    const hashed = `${plaintext}_hashed`

    this.hashed.push(hashed)

    return hashed
  }
}