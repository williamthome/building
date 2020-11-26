import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { ActiveCompanyMiddleware, AuthMiddleware, RequirementsMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { DeleteCompanyController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

@InjectableArray('routes')
export class DeleteCompanyRoute implements Route<CompanyEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCompanyData)

  constructor (
    @Inject(DeleteCompanyController)
    public readonly controller: Controller<CompanyEntity>,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'DELETE' }
  get path (): string { return '/company' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}