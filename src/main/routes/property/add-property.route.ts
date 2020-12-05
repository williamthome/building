import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { AddPropertyController } from '@/presentation/controllers'
import { PropertyEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { PropertyEntityDto } from '@/domain/protocols'

export const addPropertyPath = new RoutePath(
  'POST',
  '/property'
)

@InjectableRoute(addPropertyPath)
export class AddPropertyRoute implements Route<PropertyEntityDto, PropertyEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageProperties)

  constructor (
    @InjectRouteController(AddPropertyController)
    public readonly controller: AddPropertyController,

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