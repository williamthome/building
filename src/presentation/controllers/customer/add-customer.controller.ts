// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { AddCustomerUseCase } from '@/domain/usecases'
import { Customer, Company, customerSchema, CreateCustomerDto } from '@/domain/entities'

@InjectableController()
export class AddCustomerController implements Controller<CreateCustomerDto, Customer> {
  constructor(
    @Inject()
    private readonly addCustomerUseCase: AddCustomerUseCase
  ) {}

  @HandleError
  @Validate({
    planLimitFor: 'customer',
    body: {
      schema: customerSchema
    }
  })
  async handle(request: HttpRequest<CreateCustomerDto>): HandleResponse<Customer> {
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const createCustomerDto = request.body as CreateCustomerDto

    const createdCustomer = await this.addCustomerUseCase.call(createCustomerDto, activeCompanyId)

    return ok(createdCustomer)
  }
}
