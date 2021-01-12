import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { UserData } from '@/data/models'
import { GetUserByEmailRepository } from '@/data/repositories'

@Injectable('getUserByEmailRepository')
export class DbGetUserByEmailRepository implements GetUserByEmailRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getUserByEmail = async (email: UserData['email']): Promise<UserData | null> => {
    return await this.db.getOne<UserData, 'email'>({
      collectionName: 'users',
      matchKey: 'email',
      matchValue: email
    })
  }
}
