// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { LogErrorRepository } from '@/data/repositories'
// < Only Domain
import { LogErrorUseCase } from '@/domain/usecases'
import { LogErrorDto } from '@/domain/protocols'

@Injectable('logErrorUseCase')
export class LogErrorContract implements LogErrorUseCase {

  constructor (
    @Inject() private readonly logErrorRepository: LogErrorRepository
  ) {}

  call = async (logErrorDto: LogErrorDto): Promise<void> => {
    await this.logErrorRepository.logError(logErrorDto)
  }
}