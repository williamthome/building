import jwt from 'jsonwebtoken'
import { Inject, Injectable } from '@/shared/dependency-injection'
import { Decrypter, Encrypter } from '@/domain/protocols/cryptography'

@Injectable('encrypter')
@Injectable('decrypter')
export class JwtAdapter implements Encrypter, Decrypter {
  static key = 'data'

  constructor (
    @Inject('JWT_SECRET') private readonly secret: string
  ) {}

  encrypt = async (value: string): Promise<string> => {
    return jwt.sign({ [JwtAdapter.key]: value }, this.secret)
  }

  decrypt = async (value: string): Promise<string> => {
    const decrypted = jwt.verify(value, this.secret) as Record<string, any>
    return decrypted[JwtAdapter.key]
  }
}