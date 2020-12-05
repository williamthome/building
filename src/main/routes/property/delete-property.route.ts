import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { DeletePropertyController } from '@/presentation/controllers'
import { PropertyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const deletePropertyPath = new RoutePath(
  'DELETE',
  '/property/:id'
)

@InjectableRoute(deletePropertyPath)
export class DeletePropertyRoute implements Route<undefined, PropertyEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageProperties)

  constructor (
    @InjectRouteController(DeletePropertyController)
    public readonly controller: DeletePropertyController,

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