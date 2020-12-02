import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { AddCustomerController } from '@/presentation/controllers'
import { CustomerEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { CustomerEntityDto } from '@/domain/protocols'

export const addCustomerPath = new RoutePath(
  'POST',
  '/customer'
)

@InjectableArray('routes')
export class AddCustomerRoute implements Route<CustomerEntityDto, CustomerEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCustomers)

  constructor (
    @InjectRouteController(AddCustomerController)
    public readonly controller: AddCustomerController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get path (): RoutePath { return addCustomerPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}