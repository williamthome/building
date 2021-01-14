import { Inject } from '@/shared/dependency-injection'
import {
  ActiveCompanyMiddleware,
  AuthMiddleware,
  RequirementsMiddleware,
  UserVerifiedMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { SendInviteController } from '@/presentation/controllers'
import { CreateInviteDto, Invite } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const sendInvitePath = new RoutePath('POST', '/invite')

@InjectableRoute(sendInvitePath)
export class SendInviteRoute implements Route<CreateInviteDto, Invite> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageUsers)

  constructor(
    @InjectRouteController(SendInviteController)
    public readonly controller: SendInviteController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}
