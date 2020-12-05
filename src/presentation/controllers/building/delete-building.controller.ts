// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { BuildingEntity } from '@/domain/entities'
import { DeleteBuildingUseCase } from '@/domain/usecases'

@InjectableController({
  usesTransaction: true
})
export class DeleteBuildingController implements Controller<undefined, BuildingEntity> {

  constructor (
    @Inject() private readonly deleteBuildingUseCase: DeleteBuildingUseCase
  ) { }

  @HandleError
  @Validate<undefined, BuildingEntity>({
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest): HandleResponse<BuildingEntity> {
    const requestBuildingId = request.params?.id as BuildingEntity['id']

    const deletedBuilding = await this.deleteBuildingUseCase.call(requestBuildingId)
    if (!deletedBuilding)
      return notFound(new EntityNotFoundError('Building'))

    return ok(deletedBuilding)
  }
}