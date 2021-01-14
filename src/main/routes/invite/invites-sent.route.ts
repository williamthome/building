import { Inject } from '@/shared/dependency-injection'
import {
  ActiveCompanyMiddleware,
  AuthMiddleware,
  RequirementsMiddleware,
  UserVerifiedMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { InvitesSentController } from '@/presentation/controllers'
import { Invite } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const invitesSentPath = new RoutePath('GET', '/invite/sent')

@InjectableRoute(invitesSentPath)
export class InvitesSentRoute implements Route<undefined, Invite[]> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageUsers)

  constructor(
    @InjectRouteController(InvitesSentController)
    public readonly controller: InvitesSentController,

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
