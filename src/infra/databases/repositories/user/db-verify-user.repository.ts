import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { UserData } from '@/data/models'
import { VerifyUserRepository } from '@/data/repositories'

@Injectable('verifyUserRepository')
export class DbVerifyUserRepository implements VerifyUserRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  verifyUser = async (id: UserData['id']): Promise<UserData | null> => {
    return await this.db.updateOne<UserData, 'id'>({
      collectionName: 'users',
      matchKey: 'id',
      matchValue: id,
      dto: { verified: true }
    })
  }
}