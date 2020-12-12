// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetFilesByReferenceIdRepository } from '@/data/repositories'
// < Only Domain
import { GetFilesByReferenceIdUseCase } from '@/domain/usecases'
import { File } from '@/domain/entities'

@Injectable('getFilesByReferenceIdUseCase')
export class GetFilesByReferenceIdContract implements GetFilesByReferenceIdUseCase {

  constructor (
    @Inject() private readonly getFilesByReferenceIdRepository: GetFilesByReferenceIdRepository
  ) { }

  call = async (id: string): Promise<File[]> => {
    return await this.getFilesByReferenceIdRepository.getFilesByReferenceId(id)
  }
}