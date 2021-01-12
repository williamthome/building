// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetProjectByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetProjectByIdUseCase } from '@/domain/usecases'
import { Project } from '@/domain/entities'

@Injectable('getProjectByIdUseCase')
export class GetProjectByIdContract implements GetProjectByIdUseCase {
  constructor(@Inject() private readonly getProjectByIdRepository: GetProjectByIdRepository) {}

  call = async (id: Project['id']): Promise<Project | null> => {
    return await this.getProjectByIdRepository.getProjectById(id)
  }
}
