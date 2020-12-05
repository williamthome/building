// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { PhaseEntity } from '@/domain/entities'
import { DeletePhaseUseCase } from '@/domain/usecases'

@InjectableController()
export class DeletePhaseController implements Controller<undefined, PhaseEntity> {

  constructor (
    @Inject() private readonly deletePhaseUseCase: DeletePhaseUseCase
  ) { }

  @HandleError
  @Validate<undefined, PhaseEntity>({
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest): HandleResponse<PhaseEntity> {
    const requestPhaseId = request.params?.id as PhaseEntity['id']

    const deteledPhase = await this.deletePhaseUseCase.call(requestPhaseId)
    if (!deteledPhase)
      return notFound(new EntityNotFoundError('Phase'))

    return ok(deteledPhase)
  }
}