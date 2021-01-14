// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController } from '@/presentation/decorators'
// < Out: only domain layer
import { GetInvitesByCompanyIdUseCase } from '@/domain/usecases'
import { Company, Invite } from '@/domain/entities'

@InjectableController()
export class InvitesSentController implements Controller<undefined, Invite[]> {
  constructor(
    @Inject()
    private readonly getInvitesByCompanyIdUseCase: GetInvitesByCompanyIdUseCase
  ) {}

  @HandleError
  async handle(request: HttpRequest): HandleResponse<Invite[]> {
    const id = request.activeCompanyInfo?.id as Company['id']

    const invites = await this.getInvitesByCompanyIdUseCase.call(id)

    return ok(invites)
  }
}
