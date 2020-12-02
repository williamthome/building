// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, ok } from '@/presentation/factories/http.factory'
import { propertySchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { PropertyEntity, propertyKeys, CompanyEntity, PlanEntity } from '@/domain/entities'
import { AddPropertyUseCase, GetCompanyPropertyCountUseCase } from '@/domain/usecases'
import { PropertyEntityDto } from '@/domain/protocols'
import { PlanLimitExceededError } from '@/presentation/errors'

@Injectable()
export class AddPropertyController implements Controller<PropertyEntityDto, PropertyEntity> {

  constructor (
    @Inject()
    private readonly getCompanyPropertyCountUseCase: GetCompanyPropertyCountUseCase,

    @Inject()
    private readonly addPropertyUseCase: AddPropertyUseCase
  ) { }

  @Validate<PropertyEntityDto, PropertyEntity>({
    body: {
      schema: propertySchema,
      keys: propertyKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest<PropertyEntityDto>): HandleResponse<PropertyEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const activeCompanyPlanLimits = request.activeCompanyInfo?.limit as PlanEntity['limit']

    if (activeCompanyPlanLimits !== 'unlimited') {
      const activeCompanyPropertyCount = await this.getCompanyPropertyCountUseCase.call(activeCompanyId)
      if (activeCompanyPropertyCount === activeCompanyPlanLimits.property)
        return forbidden(new PlanLimitExceededError('properties'))
    }

    const requestPropertyDto = request.body as PropertyEntityDto

    const createdProperty = await this.addPropertyUseCase.call(requestPropertyDto, activeCompanyId)

    return ok(createdProperty)
  }
}