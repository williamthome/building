import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { UpdateCustomerController } from '@/presentation/controllers'
import { CustomerEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { CustomerEntityDto } from '@/domain/protocols'

export const updateCustomerPath = new RoutePath(
  'PATCH',
  '/customer/:id'
)

@InjectableArray('routes')
export class UpdateCustomerRoute implements Route<CustomerEntityDto, CustomerEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageCustomers)

  constructor (
    @InjectRouteController(UpdateCustomerController)
    public readonly controller: UpdateCustomerController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get path (): RoutePath { return updateCustomerPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}