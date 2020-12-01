// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetProjectByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetProjectByIdUseCase } from '@/domain/usecases'
import { ProjectEntity } from '@/domain/entities'

@Injectable('getProjectByIdUseCase')
export class GetProjectByIdContract implements GetProjectByIdUseCase {

  constructor (
    @Inject() private readonly getProjectByIdRepository: GetProjectByIdRepository
  ) {}

  call = async (id: ProjectEntity['id']): Promise<ProjectEntity | null> => {
    return await this.getProjectByIdRepository.getProjectById(id)
  }
}