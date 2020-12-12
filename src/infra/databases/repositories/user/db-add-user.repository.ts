import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreateUserData, UserData } from '@/data/models'
import { AddUserRepository } from '@/data/repositories'

@Injectable('addUserRepository')
export class DbAddUserRepository implements AddUserRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  addUser = async (dto: CreateUserData): Promise<UserData> => {
    return await this.db.addOne({
      collectionName: 'users',
      dto
    })
  }
}