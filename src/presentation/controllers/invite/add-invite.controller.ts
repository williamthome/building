// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { InviteAlreadySentError, UserAlreadyAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import {
  AddInviteUseCase,
  GetInvitesByUserEmailUseCase,
  GetUserByEmailUseCase
} from '@/domain/usecases'
import { Company, CreateInviteDto, Invite, inviteSchema, User } from '@/domain/entities'
import { Member } from '@/domain/entities/nested'
import { userIsMember } from '@/domain/helpers/user.helper'
import { inviteAlreadySent } from '@/domain/helpers/invite.helper'

@InjectableController()
export class AddInviteController implements Controller<CreateInviteDto, Invite> {
  constructor(
    @Inject()
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,

    @Inject()
    private readonly getInvitesByUserEmailUseCase: GetInvitesByUserEmailUseCase,

    @Inject()
    private readonly addInviteUseCase: AddInviteUseCase
  ) {}

  @HandleError
  @Validate({
    body: {
      schema: inviteSchema
    }
  })
  async handle(request: HttpRequest<CreateInviteDto>): HandleResponse<Invite> {
    const loggedUserId = request.loggedUserInfo?.id as User['id']
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const activeCompanyMembers = request.activeCompanyInfo?.members as Member[]
    const createInviteDto = request.body as CreateInviteDto

    const { to: email } = createInviteDto

    const user = await this.getUserByEmailUseCase.call(email)
    if (user && userIsMember(activeCompanyMembers, user.id))
      return badRequest(new UserAlreadyAMemberError())

    const userInvites = await this.getInvitesByUserEmailUseCase.call(email)
    if (inviteAlreadySent(userInvites, email, activeCompanyId))
      return badRequest(new InviteAlreadySentError())

    const invite = await this.addInviteUseCase.call(createInviteDto, loggedUserId, activeCompanyId)

    return ok(invite)
  }
}
