// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateProjectRepository } from '@/data/repositories'
// < Only Domain
import { Project, UpdateProjectDto } from '@/domain/entities'
import { UpdateProjectUseCase } from '@/domain/usecases'

@Injectable('updateProjectUseCase')
export class UpdateProjectContract implements UpdateProjectUseCase {

  constructor (
    @Inject() private readonly updateProjectRepository: UpdateProjectRepository
  ) {}

  call = async (id: Project['id'], dto: UpdateProjectDto): Promise<Project | null> => {
    return await this.updateProjectRepository.updateProject(id, dto)
  }
}