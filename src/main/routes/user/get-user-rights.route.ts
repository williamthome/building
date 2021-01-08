import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { GetUserRightsController } from '@/presentation/controllers'
import { UserRights } from '@/domain/entities'

export const GetUserRightsPath = new RoutePath(
  'GET',
  '/user/rights'
)

@InjectableRoute(GetUserRightsPath)
export class GetUserRightsRoute implements Route<undefined, UserRights[]> {
  constructor (
    @InjectRouteController(GetUserRightsController)
    public readonly controller: GetUserRightsController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) { }

  get middlewares (): Middleware[] { return [this.authMiddleware] }
}