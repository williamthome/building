// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { DeletePropertyUseCase } from '@/domain/usecases'
import { Property } from '@/domain/entities'
import { idSchema } from '@/domain/protocols'

@InjectableController()
export class DeletePropertyController implements Controller<undefined, Property> {

  constructor (
    @Inject() private readonly deletePropertyUseCase: DeletePropertyUseCase
  ) { }

  @HandleError
  @Validate({
    params: {
      schema: idSchema
    }
  })
  async handle (request: HttpRequest): HandleResponse<Property> {
    const propertyId = request.params?.id as Property['id']

    const deteledProperty = await this.deletePropertyUseCase.call(propertyId)
    if (!deteledProperty)
      return notFound(new EntityNotFoundError('Property'))

    return ok(deteledProperty)
  }
}