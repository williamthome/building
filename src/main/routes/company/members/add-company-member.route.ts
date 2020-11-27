import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, ParamIdMatchActiveCompanyIdMiddleware, RequirementsMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { AddCompanyMemberController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { MemberEntity } from '@/domain/entities/nested'

@InjectableArray('routes')
export class AddCompanyMemberRoute implements Route<MemberEntity, CompanyEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCompanyData)

  constructor (
    @Inject(AddCompanyMemberController)
    public readonly controller: AddCompanyMemberController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(ParamIdMatchActiveCompanyIdMiddleware)
    private readonly paramIdMatchActiveCompanyIdMiddleware: ParamIdMatchActiveCompanyIdMiddleware
  ) { }

  get method (): HttpMethods { return 'POST' }
  get path (): string { return '/company/:id/members' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.requirementsMiddleware,
      this.paramIdMatchActiveCompanyIdMiddleware
    ]
  }
}