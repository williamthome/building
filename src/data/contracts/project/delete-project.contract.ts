// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeleteProjectRepository } from '@/data/repositories'
// < Only Domain
import { ProjectEntity } from '@/domain/entities'
import { DeleteProjectUseCase } from '@/domain/usecases'

@Injectable('deleteProjectUseCase')
export class DeleteProjectContract implements DeleteProjectUseCase {

  constructor (
    @Inject() private readonly deleteProjectRepository: DeleteProjectRepository
  ) {}

  call = async (projectId: ProjectEntity['id']): Promise<ProjectEntity | null> => {
    return await this.deleteProjectRepository.deleteProject(projectId)
  }
}