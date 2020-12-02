// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { phaseSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { PhaseEntity, phaseKeys, CompanyEntity, BuildingEntity, PlanEntity } from '@/domain/entities'
import { AddPhaseUseCase, GetBuildingByIdUseCase, GetCompanyPhaseCountUseCase } from '@/domain/usecases'
import { PhaseEntityDto } from '@/domain/protocols'
import { EntityNotFoundError, PlanLimitExceededError } from '@/presentation/errors'

@Injectable()
export class AddPhaseController implements Controller<PhaseEntityDto, PhaseEntity> {

  constructor (
    @Inject()
    private readonly getCompanyPhaseCountUseCase: GetCompanyPhaseCountUseCase,

    @Inject()
    private readonly addPhaseUseCase: AddPhaseUseCase,

    @Inject()
    private readonly getBuildingByIdUseCase: GetBuildingByIdUseCase
  ) { }

  @Validate<PhaseEntityDto, PhaseEntity>({
    body: {
      schema: phaseSchema,
      keys: phaseKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest<PhaseEntityDto>): HandleResponse<PhaseEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const activeCompanyPlanLimits = request.activeCompanyInfo?.limit as PlanEntity['limit']

    if (activeCompanyPlanLimits !== 'unlimited') {
      const activeCompanyPhaseCount = await this.getCompanyPhaseCountUseCase.call(activeCompanyId)
      if (activeCompanyPhaseCount === activeCompanyPlanLimits.phase)
        return forbidden(new PlanLimitExceededError('phases'))
    }

    const requestPhaseDto = request.body as PhaseEntityDto
    const requestBuildingId = requestPhaseDto.buildingId as BuildingEntity['id']

    const findedBuilding = await this.getBuildingByIdUseCase.call(requestBuildingId)
    if (!findedBuilding)
      return notFound(new EntityNotFoundError('Building'))

    const createdPhase = await this.addPhaseUseCase.call(requestPhaseDto, activeCompanyId)

    return ok(createdPhase)
  }
}