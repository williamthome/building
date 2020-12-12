import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { UnverifiedData } from '@/data/models'
import { DeleteUnverifiedRepository } from '@/data/repositories'

@Injectable('deleteUnverifiedRepository')
export class DbDeleteUnverifiedRepository implements DeleteUnverifiedRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  deleteUnverified = async (userId: UnverifiedData['userId']): Promise<UnverifiedData | null> => {
    return await this.db.deleteOne<UnverifiedData, 'userId'>({
      collectionName: 'unverified',
      matchKey: 'userId',
      matchValue: userId
    })
  }
}