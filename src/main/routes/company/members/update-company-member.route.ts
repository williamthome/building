import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  RequirementsMiddleware,
  ActiveCompanyMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { UpdateCompanyMemberController } from '@/presentation/controllers'
import { Company } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { UpdateMemberDto } from '@/domain/entities/nested'

export const updateCompanyMemberPath = new RoutePath('PATCH', '/member/:id')

@InjectableRoute(updateCompanyMemberPath)
export class UpdateCompanyMemberRoute implements Route<UpdateMemberDto, Company> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCompanyData)

  constructor(
    @InjectRouteController(UpdateCompanyMemberController)
    public readonly controller: UpdateCompanyMemberController,

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
