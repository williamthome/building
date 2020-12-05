// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { TechnicianEntity } from '@/domain/entities'
import { DeleteTechnicianUseCase } from '@/domain/usecases'

@InjectableController()
export class DeleteTechnicianController implements Controller<undefined, TechnicianEntity> {

  constructor (
    @Inject() private readonly deleteTechnicianUseCase: DeleteTechnicianUseCase
  ) { }

  @HandleError
  @Validate<undefined, TechnicianEntity>({
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest): HandleResponse<TechnicianEntity> {
    const requestTechnicianId = request.params?.id as TechnicianEntity['id']

    const deteledTechnician = await this.deleteTechnicianUseCase.call(requestTechnicianId)
    if (!deteledTechnician)
      return notFound(new EntityNotFoundError('Technician'))

    return ok(deteledTechnician)
  }
}