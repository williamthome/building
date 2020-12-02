// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { CustomerEntity } from '@/domain/entities'
import { DeleteCustomerUseCase } from '@/domain/usecases'

@Injectable()
export class DeleteCustomerController implements Controller<undefined, CustomerEntity> {

  constructor (
    @Inject() private readonly deleteCustomerUseCase: DeleteCustomerUseCase
  ) { }

  @Validate<undefined, CustomerEntity>({
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest): HandleResponse<CustomerEntity> {
    const requestCustomerId = request.params?.id as CustomerEntity['id']

    const deteledCustomer = await this.deleteCustomerUseCase.call(requestCustomerId)
    if (!deteledCustomer)
      return notFound(new EntityNotFoundError('Customer'))

    return ok(deteledCustomer)
  }
}