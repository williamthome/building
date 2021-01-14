import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware, UserVerifiedMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { AcceptInviteController } from '@/presentation/controllers'

export const acceptInvitePath = new RoutePath('PATCH', '/invite/:id')

@InjectableRoute(acceptInvitePath)
export class AcceptInviteRoute implements Route<undefined, null> {
  constructor(
    @InjectRouteController(AcceptInviteController)
    public readonly controller: AcceptInviteController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [this.authMiddleware, this.userVerifiedMiddleware]
  }
}
