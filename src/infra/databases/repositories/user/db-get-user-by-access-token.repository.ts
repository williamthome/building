import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { UserData } from '@/data/models'
import { GetUserByAccessTokenRepository } from '@/data/repositories'

@Injectable('getUserByAccessTokenRepository')
export class DbGetUserByAccessTokenRepository implements GetUserByAccessTokenRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getUserByAccessToken = async (accessToken: UserData['accessToken']): Promise<UserData | null> => {
    return await this.db.getOne<UserData, 'accessToken'>({
      collectionName: 'users',
      matchKey: 'accessToken',
      matchValue: accessToken
    })
  }
}