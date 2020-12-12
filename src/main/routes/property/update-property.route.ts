import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { UpdatePropertyController } from '@/presentation/controllers'
import { Property, UpdatePropertyDto } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const updatePropertyPath = new RoutePath(
  'PATCH',
  '/property/:id'
)

@InjectableRoute(updatePropertyPath)
export class UpdatePropertyRoute implements Route<UpdatePropertyDto, Property> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageProperties)

  constructor (
    @InjectRouteController(UpdatePropertyController)
    public readonly controller: UpdatePropertyController,

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