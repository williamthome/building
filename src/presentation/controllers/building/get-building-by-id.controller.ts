// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { GetBuildingByIdUseCase } from '@/domain/usecases'
import { Building } from '@/domain/entities'
import { idSchema } from '@/domain/protocols'

@InjectableController()
export class GetBuildingByIdController implements Controller<undefined, Building> {
  constructor(
    @Inject()
    private readonly getBuildingByIdUseCase: GetBuildingByIdUseCase
  ) {}

  @HandleError
  @Validate({
    params: {
      schema: idSchema
    }
  })
  async handle(request: HttpRequest): HandleResponse<Building> {
    const { id } = request.params as { id: string }

    const findedBuilding = await this.getBuildingByIdUseCase.call(id)
    if (!findedBuilding) return notFound(new EntityNotFoundError('Building'))

    return ok(findedBuilding)
  }
}
