// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { customerSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { CustomerEntity, customerKeys, CompanyEntity } from '@/domain/entities'
import { AddCustomerUseCase } from '@/domain/usecases'
import { CustomerEntityDto } from '@/domain/protocols'

@Injectable()
export class AddCustomerController implements Controller<CustomerEntityDto, CustomerEntity> {

  constructor (
    @Inject()
    private readonly addCustomerUseCase: AddCustomerUseCase
  ) { }

  @HandleError
  @Validate<CustomerEntityDto, CustomerEntity>({
    planLimitFor: 'customer',
    body: {
      schema: customerSchema,
      keys: customerKeys
    }
  })
  async handle (request: HttpRequest<CustomerEntityDto>): HandleResponse<CustomerEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const requestCustomerDto = request.body as CustomerEntityDto

    const createdCustomer = await this.addCustomerUseCase.call(requestCustomerDto, activeCompanyId)

    return ok(createdCustomer)
  }
}