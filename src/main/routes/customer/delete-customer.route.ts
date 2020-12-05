import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { DeleteCustomerController } from '@/presentation/controllers'
import { CustomerEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const deleteCustomerPath = new RoutePath(
  'DELETE',
  '/customer/:id'
)

@InjectableRoute(deleteCustomerPath)
export class DeleteCustomerRoute implements Route<undefined, CustomerEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCustomers)

  constructor (
    @InjectRouteController(DeleteCustomerController)
    public readonly controller: DeleteCustomerController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}