// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { UpdatePhaseUseCase } from '@/domain/usecases'
import { Phase, phaseSchema, UpdatePhaseDto } from '@/domain/entities'
import { Schema, string } from '@/domain/protocols/schema'

@InjectableController()
export class UpdatePhaseController implements Controller<UpdatePhaseDto, Phase> {
  constructor(@Inject() private readonly updatePhaseUseCase: UpdatePhaseUseCase) {}

  @HandleError
  @Validate({
    body: {
      schema: phaseSchema,
      options: {
        allKeys: false
      }
    },
    params: {
      schema: new Schema({
        id: string().required()
      })
    }
  })
  async handle(request: HttpRequest<UpdatePhaseDto>): HandleResponse<Phase> {
    const phaseId = request.params?.id as Phase['id']
    const updatePhaseDto = request.body as UpdatePhaseDto

    const udpatedPhase = await this.updatePhaseUseCase.call(phaseId, updatePhaseDto)
    if (!udpatedPhase) return notFound(new EntityNotFoundError('Phase'))

    return ok(udpatedPhase)
  }
}
