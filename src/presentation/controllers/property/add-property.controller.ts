// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { AddPropertyUseCase } from '@/domain/usecases'
import { Property, Company, propertySchema, CreatePropertyDto } from '@/domain/entities'

@InjectableController()
export class AddPropertyController implements Controller<CreatePropertyDto, Property> {
  constructor(
    @Inject()
    private readonly addPropertyUseCase: AddPropertyUseCase
  ) {}

  @HandleError
  @Validate({
    planLimitFor: 'property',
    body: {
      schema: propertySchema
    }
  })
  async handle(request: HttpRequest<CreatePropertyDto>): HandleResponse<Property> {
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const createPropertyDto = request.body as CreatePropertyDto

    const createdProperty = await this.addPropertyUseCase.call(createPropertyDto, activeCompanyId)

    return ok(createdProperty)
  }
}
