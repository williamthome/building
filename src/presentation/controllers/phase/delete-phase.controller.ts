// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { PhaseEntity } from '@/domain/entities'
import { DeletePhaseUseCase } from '@/domain/usecases'

@Injectable()
export class DeletePhaseController implements Controller<undefined, PhaseEntity> {

  constructor (
    @Inject() private readonly deletePhaseUseCase: DeletePhaseUseCase
  ) { }

  @Validate<undefined, PhaseEntity>({
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest): HandleResponse<PhaseEntity> {
    const requestPhaseId = request.params?.id as PhaseEntity['id']

    const deteledPhase = await this.deletePhaseUseCase.call(requestPhaseId)
    if (!deteledPhase)
      return notFound(new EntityNotFoundError('Phase'))

    return ok(deteledPhase)
  }
}