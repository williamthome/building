import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  RequirementsMiddleware,
  ParamIdMatchActiveCompanyIdMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { RemoveCompanyMemberController } from '@/presentation/controllers'
import { CompanyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const removeCompanyMemberPath = new RoutePath(
  'DELETE',
  '/company/:id/members/:userId'
)

@InjectableArray('routes')
export class RemoveCompanyMemberRoute implements Route<undefined, CompanyEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCompanyData)

  constructor (
    @InjectRouteController(RemoveCompanyMemberController)
    public readonly controller: RemoveCompanyMemberController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ParamIdMatchActiveCompanyIdMiddleware)
    private readonly paramIdMatchActiveCompanyIdMiddleware: ParamIdMatchActiveCompanyIdMiddleware
  ) { }

  get path (): RoutePath { return removeCompanyMemberPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.requirementsMiddleware,
      this.paramIdMatchActiveCompanyIdMiddleware
    ]
  }
}