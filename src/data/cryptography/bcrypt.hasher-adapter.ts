import bcrypt from 'bcrypt'
import { Injectable } from '@/shared/dependency-injection'
import { Hasher } from '@/data/protocols/cryptography'
import { HashComparer } from '@/domain/protocols/cryptography'

@Injectable('hasher')
@Injectable('hashComparer')
export class BcryptHasherAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number = 12) {}

  hash = async (plaintext: string): Promise<string> => {
    return await bcrypt.hash(plaintext, this.salt)
  }

  match = async (plaintext: string, digest: string): Promise<boolean> => {
    return await bcrypt.compare(plaintext, digest)
  }
}
