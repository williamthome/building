// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, ok } from '@/presentation/factories/http.factory'
import { customerSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { CustomerEntity, customerKeys, CompanyEntity, PlanEntity } from '@/domain/entities'
import { AddCustomerUseCase, GetCompanyCustomerCountUseCase } from '@/domain/usecases'
import { CustomerEntityDto } from '@/domain/protocols'
import { PlanLimitExceededError } from '@/presentation/errors'

@Injectable()
export class AddCustomerController implements Controller<CustomerEntityDto, CustomerEntity> {

  constructor (
    @Inject()
    private readonly getCompanyCustomerCountUseCase: GetCompanyCustomerCountUseCase,

    @Inject()
    private readonly addCustomerUseCase: AddCustomerUseCase
  ) { }

  @Validate<CustomerEntityDto, CustomerEntity>({
    body: {
      schema: customerSchema,
      keys: customerKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest<CustomerEntityDto>): HandleResponse<CustomerEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const activeCompanyPlanLimits = request.activeCompanyInfo?.limit as PlanEntity['limit']

    if (activeCompanyPlanLimits !== 'unlimited') {
      const activeCompanyCustomerCount = await this.getCompanyCustomerCountUseCase.call(activeCompanyId)
      if (activeCompanyCustomerCount === activeCompanyPlanLimits.customer)
        return forbidden(new PlanLimitExceededError('customers'))
    }

    const requestCustomerDto = request.body as CustomerEntityDto

    const createdCustomer = await this.addCustomerUseCase.call(requestCustomerDto, activeCompanyId)

    return ok(createdCustomer)
  }
}