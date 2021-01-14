import { Inject } from '@/shared/dependency-injection'
import {
  ActiveCompanyMiddleware,
  AuthMiddleware,
  RequirementsMiddleware,
  UserVerifiedMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { AddInviteController } from '@/presentation/controllers'
import { CreateInviteDto, Invite } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const addInvitePath = new RoutePath('POST', '/invite')

@InjectableRoute(addInvitePath)
export class AddInviteRoute implements Route<CreateInviteDto, Invite> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageUsers)

  constructor(
    @InjectRouteController(AddInviteController)
    public readonly controller: AddInviteController,

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
