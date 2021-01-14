import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { DeclineInviteController } from '@/presentation/controllers'

export const declineInvitePath = new RoutePath('DELETE', '/invite/:id')

@InjectableRoute(declineInvitePath)
export class DeclineInviteRoute implements Route<undefined, null> {
  constructor(
    @InjectRouteController(DeclineInviteController)
    public readonly controller: DeclineInviteController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [this.authMiddleware]
  }
}
