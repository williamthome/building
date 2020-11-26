import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserModel } from '@/data/models'
import { DeleteUserRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteUserRepository')
export class DbDeleteUserRepository implements DeleteUserRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteUser = async (userId: UserModel['id']): Promise<UserModel | null> => {
    return await this.db.deleteOne<UserModel>(userId, 'users')
  }
}