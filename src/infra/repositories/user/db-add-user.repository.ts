import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols'
import { UserModel } from '@/data/models'
import { AddUserRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('addUserRepository')
export class DbAddUserRepository implements AddUserRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addUser = async (userDto: ModelDto<UserModel>): Promise<UserModel> => {
    return await this.db.addOne<UserModel>(userDto, 'users')
  }
}