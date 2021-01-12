import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware, UserVerifiedMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { AddCompanyController } from '@/presentation/controllers'
import { Company, CreateCompanyDto } from '@/domain/entities'

export const addCompanyPath = new RoutePath('POST', '/company')

@InjectableRoute(addCompanyPath)
export class AddCompanyRoute implements Route<CreateCompanyDto, Company> {
  constructor(
    @InjectRouteController(AddCompanyController)
    public readonly controller: AddCompanyController,

    @Inject(AuthMiddleware)
    public readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [this.authMiddleware, this.userVerifiedMiddleware]
  }
}
