// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController } from '@/presentation/decorators'
// < Out: only domain layer
import { GetUserRightsUseCase } from '@/domain/usecases'
import { User, UserRights } from '@/domain/entities'

@InjectableController()
export class GetUserRightsController implements Controller<undefined, UserRights[]> {

  constructor (
    @Inject()
    private readonly getUserRightsUseCase: GetUserRightsUseCase
  ) { }

  @HandleError
  async handle (request: HttpRequest): HandleResponse<UserRights[]> {
    const id = request.loggedUserInfo?.id as User['id']

    const rights = await this.getUserRightsUseCase.call(id)

    return ok(rights)
  }
}