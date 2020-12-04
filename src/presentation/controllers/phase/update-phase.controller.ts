// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { phaseSchema, idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { PhaseEntity, phaseKeys } from '@/domain/entities'
import { UpdatePhaseUseCase } from '@/domain/usecases'
import { PhaseEntityDto } from '@/domain/protocols'

@Injectable()
export class UpdatePhaseController implements Controller<PhaseEntityDto, PhaseEntity> {

  constructor (
    @Inject() private readonly updatePhaseUseCase: UpdatePhaseUseCase
  ) { }

  @HandleError
  @Validate<PhaseEntityDto, PhaseEntity>({
    body: {
      schema: phaseSchema,
      keys: phaseKeys,
      partialValidation: true
    },
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest<PhaseEntityDto>): HandleResponse<PhaseEntity> {
    const requestPhaseId = request.params?.id as PhaseEntity['id']
    const requestPhaseDto = request.body as PhaseEntityDto

    const udpatedPhase = await this.updatePhaseUseCase.call(requestPhaseId, requestPhaseDto)
    if (!udpatedPhase)
      return notFound(new EntityNotFoundError('Phase'))

    return ok(udpatedPhase)
  }
}