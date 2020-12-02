import { Inject, Injectable } from '@/shared/dependency-injection'
import { UnverifiedModel } from '@/data/models'
import { AddUnverifiedRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { UnverifiedModelDto } from '@/data/protocols'

@Injectable('addUnverifiedRepository')
export class DbAddUnverifiedRepository implements AddUnverifiedRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addUnverified = async (unverifiedDto: UnverifiedModelDto): Promise<UnverifiedModel> => {
    return await this.db.addOne<UnverifiedModel>(unverifiedDto, 'unverified')
  }
}