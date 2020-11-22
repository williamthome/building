import { LogErrorDto } from '@/domain/protocols'

export interface LogErrorUseCase {
  call: (logErrorDto: LogErrorDto) => Promise<void>
}