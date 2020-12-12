// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { UpdatePropertyUseCase } from '@/domain/usecases'
import { Property, propertySchema, UpdatePropertyDto } from '@/domain/entities'
import { idSchema } from '@/domain/protocols'

@InjectableController()
export class UpdatePropertyController implements Controller<UpdatePropertyDto, Property> {

  constructor (
    @Inject() private readonly updatePropertyUseCase: UpdatePropertyUseCase
  ) { }

  @HandleError
  @Validate({
    body: {
      schema: propertySchema,
      options: {
        allKeys: false
      }
    },
    params: {
      schema: idSchema
    }
  })
  async handle (request: HttpRequest<UpdatePropertyDto>): HandleResponse<Property> {
    const propertyId = request.params?.id as Property['id']
    const updatePropertyDto = request.body as UpdatePropertyDto

    const udpatedProperty = await this.updatePropertyUseCase.call(propertyId, updatePropertyDto)
    if (!udpatedProperty)
      return notFound(new EntityNotFoundError('Property'))

    return ok(udpatedProperty)
  }
}