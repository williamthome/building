import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  CompanyRoleMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { DeleteCompanyController } from '@/presentation/controllers'
import { CompanyEntity } from '@/domain/entities'
import { CompanyRole } from '@/shared/constants'

export const deleteCompanyPath = new RoutePath(
  'DELETE',
  '/company'
)

@InjectableRoute(deleteCompanyPath)
export class DeleteCompanyRoute implements Route<undefined, CompanyEntity> {
  companyRoleMiddleware = new CompanyRoleMiddleware(CompanyRole.owner)

  constructor (
    @InjectRouteController(DeleteCompanyController)
    public readonly controller: DeleteCompanyController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.companyRoleMiddleware
    ]
  }
}