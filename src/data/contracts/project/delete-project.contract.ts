// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeleteProjectRepository } from '@/data/repositories'
// < Only Domain
import { Project } from '@/domain/entities'
import { DeleteProjectUseCase } from '@/domain/usecases'

@Injectable('deleteProjectUseCase')
export class DeleteProjectContract implements DeleteProjectUseCase {

  constructor (
    @Inject() private readonly deleteProjectRepository: DeleteProjectRepository
  ) {}

  call = async (id: Project['id']): Promise<Project | null> => {
    return await this.deleteProjectRepository.deleteProject(id)
  }
}