import { UserModel } from '@/data/models'
import { GetUserByIdRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('getUserByIdRepository')
export class DbGetUserByIdRepository implements GetUserByIdRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getUserById = async (id: UserModel['id']): Promise<UserModel | null> => {
    return await this.db.getOneBy<UserModel, UserModel['id']>('id', id, 'users')
  }
}