// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { phaseSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { PhaseEntity, phaseKeys, CompanyEntity, BuildingEntity } from '@/domain/entities'
import { AddPhaseUseCase, GetBuildingByIdUseCase } from '@/domain/usecases'
import { PhaseEntityDto } from '@/domain/protocols'
import { EntityNotFoundError } from '@/presentation/errors'

@Injectable()
export class AddPhaseController implements Controller<PhaseEntityDto, PhaseEntity> {

  constructor (
    @Inject()
    private readonly addPhaseUseCase: AddPhaseUseCase,

    @Inject()
    private readonly getBuildingByIdUseCase: GetBuildingByIdUseCase
  ) { }

  @HandleError
  @Validate<PhaseEntityDto, PhaseEntity>({
    planLimitFor: 'phase',
    body: {
      schema: phaseSchema,
      keys: phaseKeys
    }
  })
  async handle (request: HttpRequest<PhaseEntityDto>): HandleResponse<PhaseEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const requestPhaseDto = request.body as PhaseEntityDto
    const requestBuildingId = requestPhaseDto.buildingId as BuildingEntity['id']

    const findedBuilding = await this.getBuildingByIdUseCase.call(requestBuildingId)
    if (!findedBuilding)
      return notFound(new EntityNotFoundError('Building'))

    const createdPhase = await this.addPhaseUseCase.call(requestPhaseDto, activeCompanyId)

    return ok(createdPhase)
  }
}