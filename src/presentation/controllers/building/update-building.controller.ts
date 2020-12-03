// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { buildingSchema, idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { BuildingEntity, buildingKeys } from '@/domain/entities'
import { UpdateBuildingUseCase } from '@/domain/usecases'
import { BuildingDto } from '@/domain/protocols'

@Injectable()
export class UpdateBuildingController implements Controller<BuildingDto, BuildingEntity> {

  constructor (
    @Inject() private readonly updateBuildingUseCase: UpdateBuildingUseCase
  ) { }

  @HandleError
  @Validate<BuildingDto, BuildingEntity>({
    body: {
      schema: buildingSchema,
      keys: buildingKeys,
      nullable: true
    },
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest<BuildingDto>): HandleResponse<BuildingEntity> {
    const requestBuildingId = request.params?.id as BuildingEntity['id']
    const requestBuildingDto = request.body as BuildingDto

    const udpatedBuilding = await this.updateBuildingUseCase.call(requestBuildingId, requestBuildingDto)
    if (!udpatedBuilding)
      return notFound(new EntityNotFoundError('Building'))

    return ok(udpatedBuilding)
  }
}