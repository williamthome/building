// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import {
  Project,
  Company,
  projectSchema,
  CreateProjectDto
} from '@/domain/entities'
import {
  AddProjectUseCase,
  GetBuildingByIdUseCase,
  GetPhaseByIdUseCase
} from '@/domain/usecases'
import { EntityNotFoundError } from '@/presentation/errors'

@InjectableController()
export class AddProjectController implements Controller<CreateProjectDto, Project> {

  constructor (
    @Inject()
    private readonly addProjectUseCase: AddProjectUseCase,

    @Inject()
    private readonly getBuildingByIdUseCase: GetBuildingByIdUseCase,

    @Inject()
    private readonly getPhaseByIdUseCase: GetPhaseByIdUseCase
  ) { }

  @HandleError
  @Validate({
    planLimitFor: 'project',
    body: {
      schema: projectSchema
    }
  })
  async handle (request: HttpRequest<CreateProjectDto>): HandleResponse<Project> {
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const createProjectDto = request.body as CreateProjectDto
    const { buildingId, phaseId } = createProjectDto

    const findedBuilding = await this.getBuildingByIdUseCase.call(buildingId)
    if (!findedBuilding)
      return notFound(new EntityNotFoundError('Building'))

    const findedPhase = await this.getPhaseByIdUseCase.call(phaseId)
    if (!findedPhase)
      return notFound(new EntityNotFoundError('Phase'))

    const createdProject = await this.addProjectUseCase.call(createProjectDto, activeCompanyId)

    return ok(createdProject)
  }
}