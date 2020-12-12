// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { LogErrorRepository } from '@/data/repositories'
// < Only Domain
import { LogErrorUseCase } from '@/domain/usecases'
import { CreateLogErrorDto } from '@/domain/entities'

@Injectable('logErrorUseCase')
export class LogErrorContract implements LogErrorUseCase {

  constructor (
    @Inject() private readonly logErrorRepository: LogErrorRepository
  ) {}

  call = async (dto: CreateLogErrorDto): Promise<void> => {
    await this.logErrorRepository.logError(dto)
  }
}