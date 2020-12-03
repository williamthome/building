// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { buildingSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { BuildingEntity, buildingKeys, CompanyEntity } from '@/domain/entities'
import { AddBuildingUseCase } from '@/domain/usecases'
import { BuildingDto } from '@/domain/protocols'

@Injectable()
export class AddBuildingController implements Controller<BuildingDto, BuildingEntity> {

  constructor (
    @Inject()
    private readonly addBuildingUseCase: AddBuildingUseCase
  ) { }

  @HandleError
  @Validate<BuildingDto, BuildingEntity>({
    planLimitFor: 'building',
    body: {
      schema: buildingSchema,
      keys: buildingKeys
    }
  })
  async handle (request: HttpRequest<BuildingDto>): HandleResponse<BuildingEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const requestBuildingDto = request.body as BuildingDto

    const createdBuilding = await this.addBuildingUseCase.call(requestBuildingDto, activeCompanyId)

    return ok(createdBuilding)
  }
}