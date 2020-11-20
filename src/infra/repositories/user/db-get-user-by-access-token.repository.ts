import { UserModel } from '@/data/models'
import { GetUserByAccessTokenRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('getUserByAccessTokenRepository')
export class DbGetUserByAccessTokenRepository implements GetUserByAccessTokenRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getUserByAccessToken = async (accessToken: UserModel['accessToken']): Promise<UserModel | null> => {
    return await this.db.getOneBy<UserModel, UserModel['accessToken']>('accessToken', accessToken, 'users')
  }
}