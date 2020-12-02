import { Inject, Injectable } from '@/shared/dependency-injection'
import { UnverifiedModel, UserModel } from '@/data/models'
import { DeleteUnverifiedRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteUnverifiedRepository')
export class DbDeleteUnverifiedRepository implements DeleteUnverifiedRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteUnverified = async (userId: UserModel['id']): Promise<UnverifiedModel | null> => {
    return await this.db.deleteOneBy<UnverifiedModel, 'userId'>('userId', userId, 'unverified')
  }
}