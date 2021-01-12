import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware, UserVerifiedMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { UpdateUserActiveCompanyController } from '@/presentation/controllers'

export const updateUserActiveCompanyPath = new RoutePath('PATCH', '/user/active-company/:companyId')

@InjectableRoute(updateUserActiveCompanyPath)
export class UpdateUserActiveCompanyRoute implements Route<undefined, null> {
  constructor(
    @InjectRouteController(UpdateUserActiveCompanyController)
    public readonly controller: UpdateUserActiveCompanyController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [this.authMiddleware, this.userVerifiedMiddleware]
  }
}
