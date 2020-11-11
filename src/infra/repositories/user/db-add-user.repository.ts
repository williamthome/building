import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols/model.protocol'
import { UserModel } from '@/data/models/user.model'
import { AddUserRepository } from '@/data/repositories/user/add-user.repository'
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