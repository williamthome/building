import { HashComparer } from '@/data/protocols/cryptography'

export class HashComparerSpy implements HashComparer {
  plaintext?: string
  digest?: string
  shouldNotMatch = false
  shouldThrow = false

  match = async (plaintext: string, digest: string): Promise<boolean> => {
    this.plaintext = plaintext
    this.digest = digest

    if (this.shouldThrow) throw new Error()

    return this.shouldNotMatch
      ? false
      : plaintext === digest
  }
}