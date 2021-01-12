import { CreateLogErrorData } from '@/data/models'

export interface LogErrorRepository {
  logError: (dto: CreateLogErrorData) => Promise<void>
}
