import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreateLogErrorData } from '@/data/models'
import { LogErrorRepository } from '@/data/repositories'

@Injectable('logErrorRepository')
export class DbLogErrorRepository implements LogErrorRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  logError = async (dto: CreateLogErrorData): Promise<void> => {
    await this.db.addOne({
      collectionName: 'errors',
      dto
    })
  }
}