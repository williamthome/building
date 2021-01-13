import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware, UserVerifiedMiddleware, ActiveCompanyMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { GetBuildingByIdController } from '@/presentation/controllers'
import { Building } from '@/domain/entities'

export const getBuildingByIdPath = new RoutePath('GET', '/building/:id')

@InjectableRoute(getBuildingByIdPath)
export class GetBuildingByIdRoute implements Route<undefined, Building> {
  constructor(
    @InjectRouteController(GetBuildingByIdController)
    public readonly controller: GetBuildingByIdController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [this.authMiddleware, this.userVerifiedMiddleware, this.activeCompanyMiddleware]
  }
}
