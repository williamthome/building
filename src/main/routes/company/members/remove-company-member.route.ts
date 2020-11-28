import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  RequirementsMiddleware,
  ParamIdMatchActiveCompanyIdMiddleware
} from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { RemoveCompanyMemberController } from '@/presentation/controllers'
import { HttpMethod } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

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

  get method (): HttpMethod { return 'DELETE' }
  get path (): string { return '/company/:id/members/:userId' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.requirementsMiddleware,
      this.paramIdMatchActiveCompanyIdMiddleware
    ]
  }
}