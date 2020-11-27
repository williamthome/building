// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleLogError, UsesTransaction, ValidateParams } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { BuildingEntity } from '@/domain/entities'
import { DeleteBuildingUseCase } from '@/domain/usecases'

@Injectable()
@UsesTransaction
export class DeleteBuildingController implements Controller<undefined, BuildingEntity> {

  constructor (
    @Inject() private readonly deleteBuildingUseCase: DeleteBuildingUseCase
  ) { }

  @ValidateParams<undefined, BuildingEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleLogError
  async handle (request: HttpRequest): HandleResponse<BuildingEntity> {
    const buildingId = request.params?.id as BuildingEntity['id']

    const udpatedBuilding = await this.deleteBuildingUseCase.call(buildingId)
    if (!udpatedBuilding)
      return notFound(new EntityNotFoundError('Building'))

    return ok(udpatedBuilding)
  }
}