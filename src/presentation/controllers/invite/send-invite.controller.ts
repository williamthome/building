// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest, Mailer } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { InviteAlreadySentError, UserAlreadyAMemberError } from '@/presentation/errors'
import { sendInviteTemplate } from '@/presentation/mailers/views'
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
export class SendInviteController implements Controller<CreateInviteDto, Invite> {
  constructor(
    @Inject() private readonly mailer: Mailer,

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
    const loggedUserEmail = request.loggedUserInfo?.email as User['email']
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const activeCompanyName = request.activeCompanyInfo?.name as Company['name']
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

    const sendEmailError = await this.mailer.send({
      to: email,
      subject: `Building App | Invite to ${activeCompanyName}`,
      template: sendInviteTemplate({
        email,
        invitedFrom: loggedUserEmail,
        companyName: activeCompanyName,
        inviteLink: 'https://api-building.web.app/profile'
      })
    })
    if (sendEmailError) return serverError(sendEmailError)

    return ok(invite)
  }
}
