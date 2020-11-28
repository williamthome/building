import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  RequirementsMiddleware,
  ParamIdMatchActiveCompanyIdMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { AddCompanyMemberController } from '@/presentation/controllers'
import { CompanyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { MemberEntity } from '@/domain/entities/nested'

export const addCompanyMemberPath = new RoutePath(
  'POST',
  '/company/:id/members'
)

@InjectableArray('routes')
export class AddCompanyMemberRoute implements Route<MemberEntity, CompanyEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCompanyData)

  constructor (
    @InjectRouteController(AddCompanyMemberController)
    public readonly controller: AddCompanyMemberController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ParamIdMatchActiveCompanyIdMiddleware)
    private readonly paramIdMatchActiveCompanyIdMiddleware: ParamIdMatchActiveCompanyIdMiddleware
  ) { }

  get path (): RoutePath { return addCompanyMemberPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.requirementsMiddleware,
      this.paramIdMatchActiveCompanyIdMiddleware
    ]
  }
}