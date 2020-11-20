import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserModel } from '@/data/models/user.model'
import { UpdateUserAccessTokenRepository } from '@/data/repositories/user'
import { Database } from '@/infra/protocols'

@Injectable('updateUserAccessTokenRepository')
export class DbUpdateUserAccessTokenRepository implements UpdateUserAccessTokenRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateUserAccessToken = async (
    id: UserModel['id'],
    accessToken: UserModel['accessToken']
  ): Promise<void> => {
    await this.db.updateOne<UserModel>(id, { accessToken }, 'users')
  }
}