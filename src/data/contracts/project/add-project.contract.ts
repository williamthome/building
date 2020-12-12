// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddProjectRepository } from '@/data/repositories'
// < Only Domain
import { AddProjectUseCase } from '@/domain/usecases'
import { Project, Company, CreateProjectDto } from '@/domain/entities'

@Injectable('addProjectUseCase')
export class AddProjectContract implements AddProjectUseCase {

  constructor (
    @Inject() private readonly addProjectRepository: AddProjectRepository
  ) { }

  call = async (dto: CreateProjectDto, companyId: Company['id']): Promise<Project> => {
    return await this.addProjectRepository.addProject({
      ...dto,
      companyId
    })
  }
}