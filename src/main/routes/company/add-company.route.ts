import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, UserVerifiedMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { AddCompanyController } from '@/presentation/controllers'
import { CompanyEntity } from '@/domain/entities'
import { CompanyDto } from '@/domain/protocols'

export const addCompanyPath = new RoutePath(
  'POST',
  '/company'
)

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

  get path (): RoutePath { return addCompanyPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware
    ]
  }
}