import { Inject } from '@/shared/dependency-injection'
import { ActiveCompanyMiddleware, AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { GetUserActiveCompanyController } from '@/presentation/controllers'
import { Company } from '@/domain/entities'

export const getUserActiveCompanyPath = new RoutePath(
  'GET',
  '/user/active-company'
)

@InjectableRoute(getUserActiveCompanyPath)
export class GetUserActiveCompanyRoute implements Route<undefined, Company> {
  constructor (
    @InjectRouteController(GetUserActiveCompanyController)
    public readonly controller: GetUserActiveCompanyController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: ActiveCompanyMiddleware
  ) { }

  get middlewares (): Middleware[] {
    return [this.authMiddleware, this.activeCompanyMiddleware]
  }
}