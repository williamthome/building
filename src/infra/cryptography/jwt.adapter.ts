import jwt from 'jsonwebtoken'
// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: infra layer
// < Out: only data layer
import { Decrypter, Encrypter } from '@/data/protocols/cryptography'

@Injectable('encrypter')
@Injectable('decrypter')
export class JwtAdapter implements Encrypter, Decrypter {
  constructor (
    @Inject('JWT_SECRET') private readonly secret: string
  ) {}

  encrypt = async (value: string): Promise<string> => {
    return await Promise.resolve(jwt.sign({ id: value }, this.secret))
  }

  decrypt = async (value: string): Promise<string> => {
    return await Promise.resolve(jwt.verify(value, this.secret) as string)
  }
}