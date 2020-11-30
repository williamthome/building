import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserModel } from '@/data/models'
import { AddUserRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { UserModelDto } from '@/data/protocols'

@Injectable('addUserRepository')
export class DbAddUserRepository implements AddUserRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addUser = async (userDto: UserModelDto): Promise<UserModel> => {
    return await this.db.addOne<UserModel>(userDto, 'users')
  }
}