import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { InvitesReceivedController } from '@/presentation/controllers'
import { Invite } from '@/domain/entities'

export const invitesReceivedPath = new RoutePath('GET', '/invite/received')

@InjectableRoute(invitesReceivedPath)
export class InvitesReceivedRoute implements Route<undefined, Invite[]> {
  constructor(
    @InjectRouteController(InvitesReceivedController)
    public readonly controller: InvitesReceivedController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [this.authMiddleware]
  }
}
