import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  CompanyRoleMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { DeleteCompanyController } from '@/presentation/controllers'
import { CompanyEntity } from '@/domain/entities'
import { CompanyRole } from '@/shared/constants'

export const deleteCompanyPath = new RoutePath(
  'DELETE',
  '/company'
)

@InjectableArray('routes')
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

  get path (): RoutePath { return deleteCompanyPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.companyRoleMiddleware
    ]
  }
}