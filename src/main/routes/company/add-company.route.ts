import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route, RouteRequirement } from '@/main/protocols'
import { AddCompanyController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'

@InjectableArray('routes')
export class AddCompanyRoute implements Route<CompanyEntity> {
  constructor (
    @Inject(AddCompanyController) public readonly controller: Controller<CompanyEntity>,
    @Inject(AuthMiddleware) public readonly authMiddleware: Middleware
  ) { }

  get method(): HttpMethods { return 'POST' }
  get path(): string { return '/company' }
  get requirement(): RouteRequirement { return 'none' }
  get middlewares(): Middleware[] { return [this.authMiddleware] }
}