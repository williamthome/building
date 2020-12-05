import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware,
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { UpdateCompanyController } from '@/presentation/controllers'
import { CompanyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { CompanyDto } from '@/domain/protocols'

export const updateCompanyPath = new RoutePath(
  'PATCH',
  '/company'
)

@InjectableRoute(updateCompanyPath)
export class UpdateCompanyRoute implements Route<CompanyDto, CompanyEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCompanyData)

  constructor (
    @InjectRouteController(UpdateCompanyController)
    public readonly controller: UpdateCompanyController,

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
      this.requirementsMiddleware
    ]
  }
}