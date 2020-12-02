// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, ok } from '@/presentation/factories/http.factory'
import { buildingSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
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

  @Validate<BuildingDto, BuildingEntity>({
    body: {
      schema: buildingSchema,
      keys: buildingKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest<BuildingDto>): HandleResponse<BuildingEntity> {
    const activeCompanyPlanLimits = request.activeCompanyInfo?.limit as PlanEntity['limit']
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']

    if (activeCompanyPlanLimits !== 'unlimited') {
      const activeCompanyBuildingCount = await this.getCompanyBuildingCountUseCase.call(activeCompanyId)
      if (activeCompanyBuildingCount === activeCompanyPlanLimits.building)
        return forbidden(new PlanLimitExceededError('buildings'))
    }

    const requestBuildingDto = request.body as BuildingDto

    const createdBuilding = await this.addBuildingUseCase.call(requestBuildingDto, activeCompanyId)

    return ok(createdBuilding)
  }
}