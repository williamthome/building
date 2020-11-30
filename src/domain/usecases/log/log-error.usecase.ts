import { LogErrorEntityDto } from '@/domain/protocols'

export interface LogErrorUseCase {
  call: (logErrorDto: LogErrorEntityDto) => Promise<void>
}