// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { propertySchema, idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { PropertyEntity, propertyKeys } from '@/domain/entities'
import { UpdatePropertyUseCase } from '@/domain/usecases'
import { PropertyEntityDto } from '@/domain/protocols'

@InjectableController()
export class UpdatePropertyController implements Controller<PropertyEntityDto, PropertyEntity> {

  constructor (
    @Inject() private readonly updatePropertyUseCase: UpdatePropertyUseCase
  ) { }

  @HandleError
  @Validate<PropertyEntityDto, PropertyEntity>({
    body: {
      schema: propertySchema,
      keys: propertyKeys,
      partialValidation: true
    },
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest<PropertyEntityDto>): HandleResponse<PropertyEntity> {
    const requestPropertyId = request.params?.id as PropertyEntity['id']
    const requestPropertyDto = request.body as PropertyEntityDto

    const udpatedProperty = await this.updatePropertyUseCase.call(requestPropertyId, requestPropertyDto)
    if (!udpatedProperty)
      return notFound(new EntityNotFoundError('Property'))

    return ok(udpatedProperty)
  }
}