// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { Technician, technicianSchema, UpdateTechnicianDto } from '@/domain/entities'
import { UpdateTechnicianUseCase } from '@/domain/usecases'
import { idSchema } from '@/domain/protocols'

@InjectableController()
export class UpdateTechnicianController implements Controller<UpdateTechnicianDto, Technician> {

  constructor (
    @Inject() private readonly updateTechnicianUseCase: UpdateTechnicianUseCase
  ) { }

  @HandleError
  @Validate({
    body: {
      schema: technicianSchema,
      options: {
        allKeys: false
      }
    },
    params: {
      schema: idSchema
    }
  })
  async handle (request: HttpRequest<UpdateTechnicianDto>): HandleResponse<Technician> {
    const technicianId = request.params?.id as Technician['id']
    const updateTechnicianDto = request.body as UpdateTechnicianDto

    const udpatedTechnician = await this.updateTechnicianUseCase.call(technicianId, updateTechnicianDto)
    if (!udpatedTechnician)
      return notFound(new EntityNotFoundError('Technician'))

    return ok(udpatedTechnician)
  }
}