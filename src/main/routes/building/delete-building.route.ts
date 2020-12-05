import { Inject } from '@/shared/dependency-injection'
import { UserFeatures } from '@/shared/constants'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { DeleteBuildingController } from '@/presentation/controllers'
import { BuildingEntity } from '@/domain/entities'

export const deleteBuildingPath = new RoutePath(
  'DELETE',
  '/building/:id'
)

@InjectableRoute(deleteBuildingPath)
export class DeleteBuildingRoute implements Route<undefined, BuildingEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageBuildings)

  constructor (
    @InjectRouteController(DeleteBuildingController)
    public readonly controller: DeleteBuildingController,

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