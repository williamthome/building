import { Inject, Injectable } from '@/shared/dependency-injection'
import { LogErrorModel } from '@/data/models'
import { LogErrorRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { LogErrorModelDto } from '@/data/protocols'

@Injectable('logErrorRepository')
export class DbLogErrorRepository implements LogErrorRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  logError = async (logErrorDto: LogErrorModelDto): Promise<void> => {
    await this.db.addOne<LogErrorModel>(logErrorDto, 'errors')
  }
}