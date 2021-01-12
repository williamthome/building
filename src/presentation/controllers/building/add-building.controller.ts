// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { AddBuildingUseCase } from '@/domain/usecases'
import { Building, buildingSchema, Company, CreateBuildingDto } from '@/domain/entities'

@InjectableController()
export class AddBuildingController implements Controller<CreateBuildingDto, Building> {
  constructor(
    @Inject()
    private readonly addBuildingUseCase: AddBuildingUseCase
  ) {}

  @HandleError
  @Validate({
    planLimitFor: 'building',
    body: {
      schema: buildingSchema
    }
  })
  async handle(request: HttpRequest<CreateBuildingDto>): HandleResponse<Building> {
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const createBuildingDto = request.body as CreateBuildingDto

    const createdBuilding = await this.addBuildingUseCase.call(createBuildingDto, activeCompanyId)

    return ok(createdBuilding)
  }
}
