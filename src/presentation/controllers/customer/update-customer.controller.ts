// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { customerSchema, idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { CustomerEntity, customerKeys } from '@/domain/entities'
import { UpdateCustomerUseCase } from '@/domain/usecases'
import { CustomerEntityDto } from '@/domain/protocols'

@Injectable()
export class UpdateCustomerController implements Controller<CustomerEntityDto, CustomerEntity> {

  constructor (
    @Inject() private readonly updateCustomerUseCase: UpdateCustomerUseCase
  ) { }

  @Validate<CustomerEntityDto, CustomerEntity>({
    body: {
      schema: customerSchema,
      keys: customerKeys,
      nullable: true
    },
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest<CustomerEntityDto>): HandleResponse<CustomerEntity> {
    const requestCustomerId = request.params?.id as CustomerEntity['id']
    const requestCustomerDto = request.body as CustomerEntityDto

    const udpatedCustomer = await this.updateCustomerUseCase.call(requestCustomerId, requestCustomerDto)
    if (!udpatedCustomer)
      return notFound(new EntityNotFoundError('Customer'))

    return ok(udpatedCustomer)
  }
}