import bcrypt from 'bcrypt'
// > In: infra layer
// < Out: only data layer
import { Hasher, HashComparer } from '../protocols'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (
    private readonly salt: number = 12
  ) {}

  hash = async (plaintext: string): Promise<string> => {
    return await bcrypt.hash(plaintext, this.salt)
  }

  match = async (plaintext: string, digest: string): Promise<boolean> => {
    return await bcrypt.compare(plaintext, digest)
  }
}