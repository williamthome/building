import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, UserVerifiedMiddleware, } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { UpdateUserActiveCompanyController } from '@/presentation/controllers'
import { HttpMethod } from '@/presentation/protocols'

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

  get method (): HttpMethod { return 'PATCH' }
  get path (): string { return '/user/activeCompany/:companyId' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware
    ]
  }
}