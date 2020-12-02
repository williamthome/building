import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { DeleteCustomerController } from '@/presentation/controllers'
import { CustomerEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const deleteCustomerPath = new RoutePath(
  'DELETE',
  '/customer/:id'
)

@InjectableArray('routes')
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

  get path (): RoutePath { return deleteCustomerPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}