import { LogErrorModelDto } from '@/data/protocols'

export interface LogErrorRepository {
  logError: (logErrorDto: LogErrorModelDto) => Promise<void>
}