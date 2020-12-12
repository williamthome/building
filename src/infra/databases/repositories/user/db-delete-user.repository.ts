import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { UserData } from '@/data/models'
import { DeleteUserRepository } from '@/data/repositories'

@Injectable('deleteUserRepository')
export class DbDeleteUserRepository implements DeleteUserRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  deleteUser = async (id: UserData['id']): Promise<UserData | null> => {
    return await this.db.deleteOne<UserData, 'id'>({
      collectionName: 'users',
      matchKey: 'id',
      matchValue: id
    })
  }
}