import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, ParamIdMatchActiveCompanyIdMiddleware, RequirementsMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { RemoveCompanyMemberController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

@InjectableArray('routes')
export class RemoveCompanyMemberRoute implements Route<undefined, CompanyEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCompanyData)

  constructor (
    @Inject(RemoveCompanyMemberController)
    public readonly controller: Controller<undefined, CompanyEntity>,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(ParamIdMatchActiveCompanyIdMiddleware)
    private readonly paramIdMatchActiveCompanyIdMiddleware: ParamIdMatchActiveCompanyIdMiddleware
  ) { }

  get method (): HttpMethods { return 'DELETE' }
  get path (): string { return '/company/:id/members/:userId' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.requirementsMiddleware,
      this.paramIdMatchActiveCompanyIdMiddleware
    ]
  }
}