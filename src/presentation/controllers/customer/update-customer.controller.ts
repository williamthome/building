// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { UpdateCustomerUseCase } from '@/domain/usecases'
import { Customer, customerSchema, UpdateCustomerDto } from '@/domain/entities'
import { Schema, string } from '@/domain/protocols/schema'

@InjectableController()
export class UpdateCustomerController implements Controller<UpdateCustomerDto, Customer> {

  constructor (
    @Inject() private readonly updateCustomerUseCase: UpdateCustomerUseCase
  ) { }

  @HandleError
  @Validate({
    body: {
      schema: customerSchema,
      options: {
        allKeys: false
      },
    },
    params: {
      schema: new Schema({
        id: string().required()
      })
    }
  })
  async handle (request: HttpRequest<UpdateCustomerDto>): HandleResponse<Customer> {
    const customerId = request.params?.id as Customer['id']
    const updateCustomerDto = request.body as UpdateCustomerDto

    const udpatedCustomer = await this.updateCustomerUseCase.call(customerId, updateCustomerDto)
    if (!udpatedCustomer)
      return notFound(new EntityNotFoundError('Customer'))

    return ok(udpatedCustomer)
  }
}