// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { phaseSchema } from '@/presentation/schemas'
import { HandleError, ValidateBody } from '@/presentation/decorators'
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

  @ValidateBody<PhaseEntityDto, PhaseEntity>({
    schema: phaseSchema,
    keys: phaseKeys
  })
  @HandleError
  async handle (request: HttpRequest<PhaseEntityDto>): HandleResponse<PhaseEntity> {
    const planLimits = request.activeCompanyInfo?.limit as PlanEntity['limit']
    const companyId = request.activeCompanyInfo?.id as CompanyEntity['id']

    if (planLimits !== 'unlimited') {
      const phaseCount = await this.getCompanyPhaseCountUseCase.call(companyId)
      if (phaseCount === planLimits.phase)
        return forbidden(new PlanLimitExceededError('phases'))
    }

    const phaseDto = request.body as PhaseEntityDto
    const buildingId = phaseDto.buildingId as BuildingEntity['id']

    const building = await this.getBuildingByIdUseCase.call(buildingId)
    if (!building)
      return notFound(new EntityNotFoundError('Building'))

    const newPhase = await this.addPhaseUseCase.call(phaseDto, companyId)
    return ok(newPhase)
  }
}