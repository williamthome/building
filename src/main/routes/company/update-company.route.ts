import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route, RouteRequirement } from '@/main/protocols'
import { UpdateCompanyController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'

@InjectableArray('routes')
export class UpdateCompanyRoute implements Route<CompanyEntity> {
  constructor (
    @Inject(UpdateCompanyController) public readonly controller: Controller<CompanyEntity>,
    @Inject(AuthMiddleware) public readonly authMiddleware: Middleware
  ) { }

  get method(): HttpMethods { return 'PATCH' }
  get path(): string { return '/company/:id' }
  get requirement(): RouteRequirement { return 'none' }
  get middlewares(): Middleware[] { return [this.authMiddleware] }
}