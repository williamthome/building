// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { PropertyEntity } from '@/domain/entities'
import { DeletePropertyUseCase } from '@/domain/usecases'

@Injectable()
export class DeletePropertyController implements Controller<undefined, PropertyEntity> {

  constructor (
    @Inject() private readonly deletePropertyUseCase: DeletePropertyUseCase
  ) { }

  @HandleError
  @Validate<undefined, PropertyEntity>({
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest): HandleResponse<PropertyEntity> {
    const requestPropertyId = request.params?.id as PropertyEntity['id']

    const deteledProperty = await this.deletePropertyUseCase.call(requestPropertyId)
    if (!deteledProperty)
      return notFound(new EntityNotFoundError('Property'))

    return ok(deteledProperty)
  }
}