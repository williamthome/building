import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { UpdateUserActiveCompanyController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'

@InjectableArray('routes')
export class UpdateUserActiveCompanyRoute implements Route<undefined, null> {
  constructor (
    @Inject(UpdateUserActiveCompanyController)
    public readonly controller: Controller<undefined, null>,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'PATCH' }
  get path (): string { return '/user/activeCompany/:companyId' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware
    ]
  }
}