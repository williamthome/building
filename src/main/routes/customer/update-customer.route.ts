import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { UpdateCustomerController } from '@/presentation/controllers'
import { Customer, UpdateCustomerDto } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const updateCustomerPath = new RoutePath('PATCH', '/customer/:id')

@InjectableRoute(updateCustomerPath)
export class UpdateCustomerRoute implements Route<UpdateCustomerDto, Customer> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCustomers)

  constructor(
    @InjectRouteController(UpdateCustomerController)
    public readonly controller: UpdateCustomerController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}
