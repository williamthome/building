import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { InjectRouteController } from '@/main/decorators'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { AddBuildingController } from '@/presentation/controllers'
import { BuildingEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { BuildingDto } from '@/domain/protocols'

export const addBuildingPath = new RoutePath(
  'POST',
  '/building'
)

@InjectableArray('routes')
export class AddBuildingRoute implements Route<BuildingDto, BuildingEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageBuildings)

  constructor (
    @InjectRouteController(AddBuildingController)
    public readonly controller: AddBuildingController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get path (): RoutePath { return addBuildingPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}