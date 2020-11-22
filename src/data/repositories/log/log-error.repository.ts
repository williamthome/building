import { ModelDto } from '@/data/protocols'
import { LogErrorModel } from '@/data/models'

export interface LogErrorRepository {
  logError: (logErrorDto: ModelDto<LogErrorModel>) => Promise<void>
}