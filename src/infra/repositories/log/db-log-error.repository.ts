import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols'
import { LogErrorModel } from '@/data/models'
import { LogErrorRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('logErrorRepository')
export class DbLogErrorRepository implements LogErrorRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  logError = async (logErrorDto: ModelDto<LogErrorModel>): Promise<void> => {
    await this.db.addOne<LogErrorModel>(logErrorDto, 'errors')
  }
}