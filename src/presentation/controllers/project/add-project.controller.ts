// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { projectSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateBody } from '@/presentation/decorators'
// < Out: only domain layer
import { ProjectEntity, projectKeys, CompanyEntity, BuildingEntity } from '@/domain/entities'
import { AddProjectUseCase, GetBuildingByIdUseCase } from '@/domain/usecases'
import { ProjectDto } from '@/domain/protocols'
import { EntityNotFoundError } from '@/presentation/errors'

@Injectable()
export class AddProjectController implements Controller<ProjectEntity> {

  constructor (
    @Inject() private readonly addProjectUseCase: AddProjectUseCase,
    @Inject() private readonly getBuildingByIdUseCase: GetBuildingByIdUseCase
  ) { }

  @ValidateBody<ProjectDto, ProjectEntity>({
    schema: projectSchema,
    keys: projectKeys
  })
  @HandleLogError
  async handle (request: HttpRequest<ProjectDto>): HandleResponse<ProjectEntity> {
    const companyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const projectDto = request.body as ProjectDto
    const buildingId = projectDto.buildingId as BuildingEntity['id']

    const building = await this.getBuildingByIdUseCase.call(buildingId)
    if (!building)
      return notFound(new EntityNotFoundError('Building'))

    const newProject = await this.addProjectUseCase.call(projectDto, companyId)
    return ok(newProject)
  }
}