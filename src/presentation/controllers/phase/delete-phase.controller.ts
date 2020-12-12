// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { DeletePhaseUseCase } from '@/domain/usecases'
import { Phase } from '@/domain/entities'
import { Schema, string } from '@/domain/protocols/schema'

@InjectableController()
export class DeletePhaseController implements Controller<undefined, Phase> {

  constructor (
    @Inject() private readonly deletePhaseUseCase: DeletePhaseUseCase
  ) { }

  @HandleError
  @Validate({
    params: {
      schema: new Schema({
        id: string().required()
      })
    }
  })
  async handle (request: HttpRequest): HandleResponse<Phase> {
    const phaseId = request.params?.id as Phase['id']

    const deteledPhase = await this.deletePhaseUseCase.call(phaseId)
    if (!deteledPhase)
      return notFound(new EntityNotFoundError('Phase'))

    return ok(deteledPhase)
  }
}