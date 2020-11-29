// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, ok } from '@/presentation/factories/http.factory'
import { buildingSchema } from '@/presentation/schemas'
import { HandleError, ValidateBody } from '@/presentation/decorators'
// < Out: only domain layer
import { BuildingEntity, buildingKeys, CompanyEntity, PlanEntity } from '@/domain/entities'
import { AddBuildingUseCase, GetCompanyBuildingCountUseCase } from '@/domain/usecases'
import { BuildingDto } from '@/domain/protocols'
import { PlanLimitExceededError } from '@/presentation/errors'

@Injectable()
export class AddBuildingController implements Controller<BuildingDto, BuildingEntity> {

  constructor (
    @Inject()
    private readonly getCompanyBuildingCountUseCase: GetCompanyBuildingCountUseCase,

    @Inject()
    private readonly addBuildingUseCase: AddBuildingUseCase
  ) { }

  @ValidateBody<BuildingDto, BuildingEntity>({
    schema: buildingSchema,
    keys: buildingKeys
  })
  @HandleError
  async handle (request: HttpRequest<BuildingDto>): HandleResponse<BuildingEntity> {
    const planLimits = request.activeCompanyInfo?.limit as PlanEntity['limit']
    const companyId = request.activeCompanyInfo?.id as CompanyEntity['id']

    if (planLimits !== 'unlimited') {
      const buildingCount = await this.getCompanyBuildingCountUseCase.call(companyId)
      if (buildingCount === planLimits.building)
        return forbidden(new PlanLimitExceededError('buildings'))
    }

    const buildingDto = request.body as BuildingDto
    const newBuilding = await this.addBuildingUseCase.call(buildingDto, companyId)
    return ok(newBuilding)
  }
}