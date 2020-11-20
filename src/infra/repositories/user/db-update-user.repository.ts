import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols'
import { UserModel } from '@/data/models'
import { UpdateUserRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('updateUserRepository')
export class DbUpdateUserRepository implements UpdateUserRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateUser = async (
    userId: UserModel['id'],
    userDto: ModelDto<UserModel>
  ): Promise<UserModel | null> => {
    return await this.db.updateOne<UserModel>(userId, userDto, 'users')
  }
}