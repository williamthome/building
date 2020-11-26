// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateProjectRepository } from '@/data/repositories'
// < Only Domain
import { ProjectEntity } from '@/domain/entities'
import { UpdateProjectUseCase } from '@/domain/usecases'
import { ProjectDto } from '@/domain/protocols'

@Injectable('updateProjectUseCase')
export class UpdateProjectContract implements UpdateProjectUseCase {

  constructor (
    @Inject() private readonly updateProjectRepository: UpdateProjectRepository
  ) {}

  call = async (projectId: ProjectEntity['id'], projectDto: ProjectDto): Promise<ProjectEntity | null> => {
    return await this.updateProjectRepository.updateProject(projectId, projectDto)
  }
}