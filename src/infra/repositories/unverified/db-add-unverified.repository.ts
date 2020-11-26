import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols'
import { UnverifiedModel } from '@/data/models'
import { AddUnverifiedRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('addUnverifiedRepository')
export class DbAddUnverifiedRepository implements AddUnverifiedRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addUnverified = async (unverifiedDto: ModelDto<UnverifiedModel>): Promise<UnverifiedModel> => {
    return await this.db.addOne<UnverifiedModel>(unverifiedDto, 'unverified')
  }
}