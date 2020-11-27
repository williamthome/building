import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, UserVerifiedMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { AddCompanyController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { CompanyEntity } from '@/domain/entities'
import { CompanyDto } from '@/domain/protocols'

@InjectableArray('routes')
export class AddCompanyRoute implements Route<CompanyDto, CompanyEntity> {
  constructor (
    @InjectRouteController(AddCompanyController)
    public readonly controller: AddCompanyController,

    @Inject(AuthMiddleware)
    public readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'POST' }
  get path (): string { return '/company' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware
    ]
  }
}