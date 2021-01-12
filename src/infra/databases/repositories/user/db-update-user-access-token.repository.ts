import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { UserData } from '@/data/models'
import { UpdateUserAccessTokenRepository } from '@/data/repositories'

@Injectable('updateUserAccessTokenRepository')
export class DbUpdateUserAccessTokenRepository implements UpdateUserAccessTokenRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  updateUserAccessToken = async (
    id: UserData['id'],
    accessToken: UserData['accessToken']
  ): Promise<void> => {
    await this.db.updateOne<UserData, 'id'>({
      collectionName: 'users',
      matchKey: 'id',
      matchValue: id,
      dto: { accessToken }
    })
  }
}
