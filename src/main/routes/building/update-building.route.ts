import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  ActiveCompanyMiddleware,
  UserVerifiedMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { UpdateBuildingController } from '@/presentation/controllers'
import { BuildingEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { BuildingDto } from '@/domain/protocols'

export const updateBuildingPath = new RoutePath(
  'PATCH',
  '/building/:id'
)

@InjectableArray('routes')
export class UpdateBuildingRoute implements Route<BuildingDto, BuildingEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageBuildings)

  constructor (
    @InjectRouteController(UpdateBuildingController)
    public readonly controller: UpdateBuildingController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get path (): RoutePath { return updateBuildingPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}