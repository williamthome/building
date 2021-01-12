import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { UpdateUserData, UserData } from '@/data/models'
import { UpdateUserRepository } from '@/data/repositories'

@Injectable('updateUserRepository')
export class DbUpdateUserRepository implements UpdateUserRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  updateUser = async (id: UserData['id'], dto: UpdateUserData): Promise<UserData | null> => {
    return await this.db.updateOne<UserData, 'id'>({
      collectionName: 'users',
      matchKey: 'id',
      matchValue: id,
      dto
    })
  }
}
