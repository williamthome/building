// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddProjectRepository } from '@/data/repositories'
// < Only Domain
import { ProjectEntity, CompanyEntity } from '@/domain/entities'
import { AddProjectUseCase } from '@/domain/usecases'
import { ProjectDto } from '@/domain/protocols'

@Injectable('addProjectUseCase')
export class AddProjectContract implements AddProjectUseCase {

  constructor (
    @Inject() private readonly addProjectRepository: AddProjectRepository
  ) { }

  call = async (
    projectDto: ProjectDto,
    companyId: CompanyEntity['id']
  ): Promise<ProjectEntity> => {
    return await this.addProjectRepository.addProject({
      ...projectDto,
      companyId
    })
  }
}