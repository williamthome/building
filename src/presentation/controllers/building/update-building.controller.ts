// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { UpdateBuildingUseCase } from '@/domain/usecases'
import { Building, buildingSchema, UpdateBuildingDto } from '@/domain/entities'
import { Schema, string } from '@/domain/protocols/schema'

@InjectableController()
export class UpdateBuildingController implements Controller<UpdateBuildingDto, Building> {
  constructor(@Inject() private readonly updateBuildingUseCase: UpdateBuildingUseCase) {}

  @HandleError
  @Validate({
    body: {
      schema: buildingSchema,
      options: {
        allKeys: false
      }
    },
    params: {
      schema: new Schema({
        id: string().required()
      })
    }
  })
  async handle(request: HttpRequest<UpdateBuildingDto>): HandleResponse<Building> {
    const buildingId = request.params?.id as Building['id']
    const updateBuildingDto = request.body as UpdateBuildingDto

    const udpatedBuilding = await this.updateBuildingUseCase.call(buildingId, updateBuildingDto)
    if (!udpatedBuilding) return notFound(new EntityNotFoundError('Building'))

    return ok(udpatedBuilding)
  }
}
