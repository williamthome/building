import { UserModel } from '@/data/models'
import { GetUserByEmailRepository } from '@/data/repositories/user'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('getUserByEmailRepository')
export class DbGetUserByEmailRepository implements GetUserByEmailRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getUserByEmail = async (email: UserModel['email']): Promise<UserModel | null> => {
    return await this.db.getOneBy<UserModel, UserModel['email']>('email', email, 'users')
  }
}