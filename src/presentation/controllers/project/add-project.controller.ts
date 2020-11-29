// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { projectSchema } from '@/presentation/schemas'
import { HandleError, ValidateBody } from '@/presentation/decorators'
// < Out: only domain layer
import { ProjectEntity, projectKeys, CompanyEntity, BuildingEntity, PlanEntity } from '@/domain/entities'
import { AddProjectUseCase, GetBuildingByIdUseCase, GetCompanyProjectCountUseCase } from '@/domain/usecases'
import { ProjectDto } from '@/domain/protocols'
import { EntityNotFoundError, PlanLimitExceededError } from '@/presentation/errors'

@Injectable()
export class AddProjectController implements Controller<ProjectDto, ProjectEntity> {

  constructor (
    @Inject()
    private readonly getCompanyProjectCountUseCase: GetCompanyProjectCountUseCase,

    @Inject()
    private readonly addProjectUseCase: AddProjectUseCase,

    @Inject()
    private readonly getBuildingByIdUseCase: GetBuildingByIdUseCase
  ) { }

  @ValidateBody<ProjectDto, ProjectEntity>({
    schema: projectSchema,
    keys: projectKeys
  })
  @HandleError
  async handle (request: HttpRequest<ProjectDto>): HandleResponse<ProjectEntity> {
    const planLimits = request.activeCompanyInfo?.limit as PlanEntity['limit']
    const companyId = request.activeCompanyInfo?.id as CompanyEntity['id']

    if (planLimits !== 'unlimited') {
      const projectCount = await this.getCompanyProjectCountUseCase.call(companyId)
      if (projectCount === planLimits.project)
        return forbidden(new PlanLimitExceededError('projects'))
    }

    const projectDto = request.body as ProjectDto
    const buildingId = projectDto.buildingId as BuildingEntity['id']

    const building = await this.getBuildingByIdUseCase.call(buildingId)
    if (!building)
      return notFound(new EntityNotFoundError('Building'))

    const newProject = await this.addProjectUseCase.call(projectDto, companyId)
    return ok(newProject)
  }
}