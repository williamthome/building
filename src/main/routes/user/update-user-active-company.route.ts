import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, UserVerifiedMiddleware, } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { UpdateUserActiveCompanyController } from '@/presentation/controllers'

export const updateUserActiveCompanyPath = new RoutePath(
  'PATCH',
  '/user/activeCompany/:companyId'
)

@InjectableArray('routes')
export class UpdateUserActiveCompanyRoute implements Route<undefined, null> {
  constructor (
    @InjectRouteController(UpdateUserActiveCompanyController)
    public readonly controller: UpdateUserActiveCompanyController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware
  ) { }

  get path (): RoutePath { return updateUserActiveCompanyPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware
    ]
  }
}