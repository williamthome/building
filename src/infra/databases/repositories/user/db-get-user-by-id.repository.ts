import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { UserData } from '@/data/models'
import { GetUserByIdRepository } from '@/data/repositories'

@Injectable('getUserByIdRepository')
export class DbGetUserByIdRepository implements GetUserByIdRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getUserById = async (id: UserData['id']): Promise<UserData | null> => {
    return await this.db.getOne<UserData, 'id'>({
      collectionName: 'users',
      matchKey: 'id',
      matchValue: id
    })
  }
}