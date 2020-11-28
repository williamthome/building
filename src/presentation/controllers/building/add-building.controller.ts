// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { buildingSchema } from '@/presentation/schemas'
import { HandleError, ValidateBody } from '@/presentation/decorators'
// < Out: only domain layer
import { BuildingEntity, buildingKeys, CompanyEntity } from '@/domain/entities'
import { AddBuildingUseCase } from '@/domain/usecases'
import { BuildingDto } from '@/domain/protocols'

@Injectable()
export class AddBuildingController implements Controller<BuildingDto, BuildingEntity> {

  constructor (
    @Inject() private readonly addBuildingUseCase: AddBuildingUseCase
  ) { }

  @ValidateBody<BuildingDto, BuildingEntity>({
    schema: buildingSchema,
    keys: buildingKeys
  })
  @HandleError
  async handle (request: HttpRequest<BuildingDto>): HandleResponse<BuildingEntity> {
    const companyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const buildingDto = request.body as BuildingDto
    const newBuilding = await this.addBuildingUseCase.call(buildingDto, companyId)
    return ok(newBuilding)
  }
}