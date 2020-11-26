import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { ActiveCompanyMiddleware, AuthMiddleware, CompanyRoleMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { DeleteCompanyController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'
import { CompanyRole } from '@/shared/constants'

@InjectableArray('routes')
export class DeleteCompanyRoute implements Route<undefined, CompanyEntity> {
  companyRoleMiddleware = new CompanyRoleMiddleware(CompanyRole.owner)

  constructor (
    @Inject(DeleteCompanyController)
    public readonly controller: DeleteCompanyController,

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
      this.companyRoleMiddleware
    ]
  }
}