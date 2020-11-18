import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols/model.protocol'
import { UserModel } from '@/data/models/user.model'
import { UpdateUserRepository } from '@/data/repositories/user/update-user.repository'
import { Database } from '@/infra/protocols'

@Injectable('updateUserRepository')
export class DbUpdateUserRepository implements UpdateUserRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateUser = async (userId: UserModel['id'], userDto: ModelDto<UserModel>): Promise<UserModel> => {
    return await this.db.updateOne<UserModel>(userId, userDto, 'users')
  }
}