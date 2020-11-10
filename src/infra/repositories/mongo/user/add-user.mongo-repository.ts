import { Inject, Injectable } from 'heinjector'
import { ModelDto } from '@/data/protocols/model.protocol'
import { UserModel } from '@/data/models/user.model'
import { AddUserRepository } from '@/data/repositories/user/add-user.repository'
import { MongoDB } from '@/infra/databases'

@Injectable({
  identifier: 'addUserRepository'
})
export class AddUserMongoRepository implements AddUserRepository {
  constructor (
    @Inject({ identifier: MongoDB }) private readonly mongodb: MongoDB
  ) {}

  addUser = async (userDto: ModelDto<UserModel>): Promise<UserModel> => {
    return await this.mongodb.addOne<UserModel>(userDto, 'users')
  }
}