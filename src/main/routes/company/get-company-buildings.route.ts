import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware, UserVerifiedMiddleware, ActiveCompanyMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { GetCompanyBuildingsController } from '@/presentation/controllers'
import { Building } from '@/domain/entities'

export const getCompanyBuildingsPath = new RoutePath('GET', '/company/buildings')

@InjectableRoute(getCompanyBuildingsPath)
export class GetCompanyBuildingsRoute implements Route<undefined, Building[]> {
  constructor(
    @InjectRouteController(GetCompanyBuildingsController)
    public readonly controller: GetCompanyBuildingsController,

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
