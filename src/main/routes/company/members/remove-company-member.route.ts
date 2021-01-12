import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  RequirementsMiddleware,
  ActiveCompanyMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { RemoveCompanyMemberController } from '@/presentation/controllers'
import { Company } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const removeCompanyMemberPath = new RoutePath('DELETE', '/member/:id')

@InjectableRoute(removeCompanyMemberPath)
export class RemoveCompanyMemberRoute implements Route<undefined, Company> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCompanyData)

  constructor(
    @InjectRouteController(RemoveCompanyMemberController)
    public readonly controller: RemoveCompanyMemberController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}
