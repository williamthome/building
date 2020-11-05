import { Injectable } from 'heinjector'
import { ModelDto } from '@/data/protocols/model.protocol'
import { UserModel } from '@/data/models/user.model'
import { AddUserRepository } from '@/data/repositories/user/add-user.repository'

@Injectable({
  identifier: 'addUserRepository'
})
export class UserMongoRepository implements AddUserRepository {
  addUser = async (userDto: ModelDto<UserModel>): Promise<UserModel> => {
    return await Promise.resolve(new UserModel(
      new Date(Date.now()).toISOString(), userDto.name!, userDto.address
    ))
  }
}