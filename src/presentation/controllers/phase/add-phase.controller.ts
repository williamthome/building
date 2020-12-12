// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { AddPhaseUseCase, GetBuildingByIdUseCase } from '@/domain/usecases'
import { Phase, Company, phaseSchema, CreatePhaseDto } from '@/domain/entities'
import { EntityNotFoundError } from '@/presentation/errors'

@InjectableController()
export class AddPhaseController implements Controller<CreatePhaseDto, Phase> {

  constructor (
    @Inject()
    private readonly addPhaseUseCase: AddPhaseUseCase,

    @Inject()
    private readonly getBuildingByIdUseCase: GetBuildingByIdUseCase
  ) { }

  @HandleError
  @Validate({
    planLimitFor: 'phase',
    body: {
      schema: phaseSchema
    }
  })
  async handle (request: HttpRequest<CreatePhaseDto>): HandleResponse<Phase> {
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const createPhaseDto = request.body as CreatePhaseDto
    const { buildingId } = createPhaseDto

    const findedBuilding = await this.getBuildingByIdUseCase.call(buildingId)
    if (!findedBuilding)
      return notFound(new EntityNotFoundError('Building'))

    const createdPhase = await this.addPhaseUseCase.call(createPhaseDto, activeCompanyId)

    return ok(createdPhase)
  }
}