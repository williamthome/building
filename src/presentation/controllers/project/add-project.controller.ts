// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { projectSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import {
  projectKeys,
  ProjectEntity,
  CompanyEntity,
  BuildingEntity,
  PhaseEntity
} from '@/domain/entities'
import {
  AddProjectUseCase,
  GetBuildingByIdUseCase,
  GetPhaseByIdUseCase
} from '@/domain/usecases'
import { ProjectEntityDto } from '@/domain/protocols'
import { EntityNotFoundError } from '@/presentation/errors'

@Injectable()
export class AddProjectController implements Controller<ProjectEntityDto, ProjectEntity> {

  constructor (
    @Inject()
    private readonly addProjectUseCase: AddProjectUseCase,

    @Inject()
    private readonly getBuildingByIdUseCase: GetBuildingByIdUseCase,

    @Inject()
    private readonly getPhaseByIdUseCase: GetPhaseByIdUseCase
  ) { }

  @HandleError
  @Validate<ProjectEntityDto, ProjectEntity>({
    planLimitFor: 'project',
    body: {
      schema: projectSchema,
      keys: projectKeys
    }
  })
  async handle (request: HttpRequest<ProjectEntityDto>): HandleResponse<ProjectEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const requestProjectDto = request.body as ProjectEntityDto

    const requestBuildingId = requestProjectDto.buildingId as BuildingEntity['id']
    const findedBuilding = await this.getBuildingByIdUseCase.call(requestBuildingId)
    if (!findedBuilding)
      return notFound(new EntityNotFoundError('Building'))

    const requestPhaseId = requestProjectDto.phaseId as PhaseEntity['id']
    const findedPhase = await this.getPhaseByIdUseCase.call(requestPhaseId)
    if (!findedPhase)
      return notFound(new EntityNotFoundError('Phase'))

    const createdProject = await this.addProjectUseCase.call(requestProjectDto, activeCompanyId)

    return ok(createdProject)
  }
}