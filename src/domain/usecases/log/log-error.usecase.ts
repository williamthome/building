import { CreateLogErrorDto } from '@/domain/entities'

export interface LogErrorUseCase {
  call: (dto: CreateLogErrorDto) => Promise<void>
}
