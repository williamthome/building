import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { AddCompanyController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'
import { CompanyDto } from '@/domain/protocols'

@InjectableArray('routes')
export class AddCompanyRoute implements Route<CompanyDto, CompanyEntity> {
  constructor (
    @Inject(AddCompanyController)
    public readonly controller: AddCompanyController,

    @Inject(AuthMiddleware)
    public readonly authMiddleware: Middleware
  ) { }

  get method(): HttpMethods { return 'POST' }
  get path(): string { return '/company' }
  get middlewares(): Middleware[] { return [this.authMiddleware] }
}