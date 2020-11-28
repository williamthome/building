import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware,
} from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { UpdateCompanyController } from '@/presentation/controllers'
import { HttpMethod } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { CompanyDto } from '@/domain/protocols'

@InjectableArray('routes')
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

  get method (): HttpMethod { return 'PATCH' }
  get path (): string { return '/company' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}