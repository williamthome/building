import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserModel } from '@/data/models'
import { VerifyUserRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('verifyUserRepository')
export class DbVerifyUserRepository implements VerifyUserRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  verifyUser = async (id: UserModel['id']): Promise<UserModel | null> => {
    return await this.db.updateOne<UserModel>(id, { verified: true }, 'users')
  }
}