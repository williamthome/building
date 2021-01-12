// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { Technician } from '@/domain/entities'
import { DeleteTechnicianUseCase } from '@/domain/usecases'
import { idSchema } from '@/domain/protocols'

@InjectableController()
export class DeleteTechnicianController implements Controller<undefined, Technician> {
  constructor(@Inject() private readonly deleteTechnicianUseCase: DeleteTechnicianUseCase) {}

  @HandleError
  @Validate({
    params: {
      schema: idSchema
    }
  })
  async handle(request: HttpRequest): HandleResponse<Technician> {
    const technicianId = request.params?.id as Technician['id']

    const deteledTechnician = await this.deleteTechnicianUseCase.call(technicianId)
    if (!deteledTechnician) return notFound(new EntityNotFoundError('Technician'))

    return ok(deteledTechnician)
  }
}
