import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  ActiveCompanyMiddleware,
  UserVerifiedMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { UpdateBuildingController } from '@/presentation/controllers'
import { Building, UpdateBuildingDto } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const updateBuildingPath = new RoutePath('PATCH', '/building/:id')

@InjectableRoute(updateBuildingPath)
export class UpdateBuildingRoute implements Route<UpdateBuildingDto, Building> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageBuildings)

  constructor(
    @InjectRouteController(UpdateBuildingController)
    public readonly controller: UpdateBuildingController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}
