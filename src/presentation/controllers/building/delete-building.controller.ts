// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { DeleteBuildingUseCase } from '@/domain/usecases'
import { Building } from '@/domain/entities'
import { Schema, string } from '@/domain/protocols/schema'

@InjectableController({
  usesTransaction: true
})
export class DeleteBuildingController implements Controller<undefined, Building> {
  constructor(@Inject() private readonly deleteBuildingUseCase: DeleteBuildingUseCase) {}

  @HandleError
  @Validate({
    params: {
      schema: new Schema({
        id: string().required()
      })
    }
  })
  async handle(request: HttpRequest): HandleResponse<Building> {
    const buildingId = request.params?.id as Building['id']

    const deletedBuilding = await this.deleteBuildingUseCase.call(buildingId)
    if (!deletedBuilding) return notFound(new EntityNotFoundError('Building'))

    return ok(deletedBuilding)
  }
}
