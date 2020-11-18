import { UserModel } from '@/data/models'
import { AuthenticationRepository, AuthModelDto } from '@/data/repositories/user'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('authenticationRepository')
export class DbAuthenticationRepository implements AuthenticationRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  authenticate = async (authDto: AuthModelDto): Promise<UserModel | null> => {
    return await this.db.getOneBy<UserModel, AuthModelDto['email']>('email', authDto.email, 'users')
  }
}