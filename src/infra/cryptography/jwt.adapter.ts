import jwt from 'jsonwebtoken'
// > In: infra layer
// < Out: only data layer
import { Decrypter, Encrypter } from '../protocols'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (
    private readonly secret: string
  ) {}

  encrypt = async (value: string): Promise<string> => {
    return await Promise.resolve(jwt.sign({ id: value }, this.secret))
  }

  decrypt = async (value: string): Promise<string> => {
    return await Promise.resolve(jwt.verify(value, this.secret) as string)
  }
}