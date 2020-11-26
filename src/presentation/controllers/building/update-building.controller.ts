// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { buildingSchema, idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateBody, ValidateParams } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { BuildingEntity, buildingKeys } from '@/domain/entities'
import { UpdateBuildingUseCase } from '@/domain/usecases'
import { BuildingDto } from '@/domain/protocols'

@Injectable()
export class UpdateBuildingController implements Controller<BuildingEntity> {

  constructor (
    @Inject() private readonly updateBuildingUseCase: UpdateBuildingUseCase
  ) { }

  @ValidateBody<BuildingDto, BuildingEntity>({
    schema: buildingSchema,
    keys: buildingKeys,
    nullable: true
  })
  @ValidateParams<BuildingDto, BuildingEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleLogError
  async handle (request: HttpRequest<BuildingDto>): HandleResponse<BuildingEntity> {
    const buildingId = request.params?.id as BuildingEntity['id']
    const buildingDto = request.body as BuildingDto

    const udpatedBuilding = await this.updateBuildingUseCase.call(buildingId, buildingDto)
    if (!udpatedBuilding)
      return notFound(new EntityNotFoundError('Building'))

    return ok(udpatedBuilding)
  }
}