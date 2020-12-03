// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetFilesByReferenceIdRepository } from '@/data/repositories'
// < Only Domain
import { GetFilesByReferenceIdUseCase } from '@/domain/usecases'
import { Entity } from '@/domain/protocols'
import { FileEntity } from '@/domain/entities'

@Injectable('getFilesByReferenceIdUseCase')
export class GetFilesByReferenceIdContract implements GetFilesByReferenceIdUseCase {

  constructor (
    @Inject() private readonly getFilesByReferenceIdRepository: GetFilesByReferenceIdRepository
  ) { }

  call = async (id: Entity['id']): Promise<FileEntity[]> => {
    return await this.getFilesByReferenceIdRepository.getFilesByReferenceId(id)
  }
}