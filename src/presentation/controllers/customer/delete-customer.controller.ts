// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { DeleteCustomerUseCase } from '@/domain/usecases'
import { Customer } from '@/domain/entities'
import { Schema, string } from '@/domain/protocols/schema'

@InjectableController()
export class DeleteCustomerController implements Controller<undefined, Customer> {

  constructor (
    @Inject() private readonly deleteCustomerUseCase: DeleteCustomerUseCase
  ) { }

  @HandleError
  @Validate({
    params: {
      schema: new Schema({
        id: string().required()
      })
    }
  })
  async handle (request: HttpRequest): HandleResponse<Customer> {
    const customerId = request.params?.id as Customer['id']

    const deteledCustomer = await this.deleteCustomerUseCase.call(customerId)
    if (!deteledCustomer)
      return notFound(new EntityNotFoundError('Customer'))

    return ok(deteledCustomer)
  }
}