import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreateUnverifiedData, UnverifiedData } from '@/data/models'
import { AddUnverifiedRepository } from '@/data/repositories'

@Injectable('addUnverifiedRepository')
export class DbAddUnverifiedRepository implements AddUnverifiedRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  addUnverified = async (dto: CreateUnverifiedData): Promise<UnverifiedData> => {
    return await this.db.addOne({
      collectionName: 'unverified',
      dto
    })
  }
}
