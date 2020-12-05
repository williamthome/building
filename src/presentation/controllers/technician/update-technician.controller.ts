// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { technicianSchema, idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { TechnicianEntity, technicianKeys } from '@/domain/entities'
import { UpdateTechnicianUseCase } from '@/domain/usecases'
import { TechnicianEntityDto } from '@/domain/protocols'

@InjectableController()
export class UpdateTechnicianController implements Controller<TechnicianEntityDto, TechnicianEntity> {

  constructor (
    @Inject() private readonly updateTechnicianUseCase: UpdateTechnicianUseCase
  ) { }

  @HandleError
  @Validate<TechnicianEntityDto, TechnicianEntity>({
    body: {
      schema: technicianSchema,
      keys: technicianKeys,
      partialValidation: true
    },
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest<TechnicianEntityDto>): HandleResponse<TechnicianEntity> {
    const requestTechnicianId = request.params?.id as TechnicianEntity['id']
    const requestTechnicianDto = request.body as TechnicianEntityDto

    const udpatedTechnician = await this.updateTechnicianUseCase.call(requestTechnicianId, requestTechnicianDto)
    if (!udpatedTechnician)
      return notFound(new EntityNotFoundError('Technician'))

    return ok(udpatedTechnician)
  }
}