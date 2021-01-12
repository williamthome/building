import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  RequirementsMiddleware,
  ActiveCompanyMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { AddCompanyMemberController } from '@/presentation/controllers'
import { Company } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { CreateMemberDto } from '@/domain/entities/nested'

export const addCompanyMemberPath = new RoutePath('POST', '/member')

@InjectableRoute(addCompanyMemberPath)
export class AddCompanyMemberRoute implements Route<CreateMemberDto, Company> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCompanyData)

  constructor(
    @InjectRouteController(AddCompanyMemberController)
    public readonly controller: AddCompanyMemberController,

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
