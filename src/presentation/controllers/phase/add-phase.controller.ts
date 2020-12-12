// : Shared
import { Inject } from '@/shared/dependency-injection'
import { uniqueItems } from '@/shared/helpers/array.helper'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError, SomeUserIsNotAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import { AddPhaseUseCase, GetBuildingByIdUseCase } from '@/domain/usecases'
import { Phase, Company, phaseSchema, CreatePhaseDto } from '@/domain/entities'
import { Member } from '@/domain/entities/nested'
import { userIsMember } from '@/domain/helpers/user.helper'

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
    const activeCompanyMembers = request.activeCompanyInfo?.members as Member[]
    const createPhaseDto = request.body as CreatePhaseDto

    createPhaseDto.participantIds = uniqueItems(createPhaseDto.participantIds)

    const { buildingId, participantIds } = createPhaseDto

    const findedBuilding = await this.getBuildingByIdUseCase.call(buildingId)
    if (!findedBuilding)
      return notFound(new EntityNotFoundError('Building'))

    for (const participantId of participantIds) {
      if (!userIsMember(activeCompanyMembers, participantId))
        return badRequest(new SomeUserIsNotAMemberError())
    }

    const createdPhase = await this.addPhaseUseCase.call(createPhaseDto, activeCompanyId)

    return ok(createdPhase)
  }
}