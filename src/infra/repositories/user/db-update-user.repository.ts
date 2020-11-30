import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserModel } from '@/data/models'
import { UpdateUserRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { UserModelDto } from '@/data/protocols'

@Injectable('updateUserRepository')
export class DbUpdateUserRepository implements UpdateUserRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateUser = async (
    userId: UserModel['id'],
    userDto: UserModelDto
  ): Promise<UserModel | null> => {
    return await this.db.updateOne<UserModel>(userId, userDto, 'users')
  }
}