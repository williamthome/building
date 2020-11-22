import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, RoleMiddleware } from '@/main/middlewares'
import { Middleware, Route, RouteRequirement } from '@/main/protocols'
import { UpdateCompanyController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'
import { UserRole } from '@/shared/constants'

@InjectableArray('routes')
export class UpdateCompanyRoute implements Route<CompanyEntity> {
  roleMiddleware = new RoleMiddleware([UserRole.owner, UserRole.admin])

  constructor (
    @Inject(UpdateCompanyController) public readonly controller: Controller<CompanyEntity>,
    @Inject(AuthMiddleware) public readonly authMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'PATCH' }
  get path (): string { return '/company/:id' }
  get requirement (): RouteRequirement { return 'none' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.roleMiddleware
    ]
  }
}