import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { AddBuildingController } from '@/presentation/controllers'
import { Building, CreateBuildingDto } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const addBuildingPath = new RoutePath(
  'POST',
  '/building'
)

@InjectableRoute(addBuildingPath)
export class AddBuildingRoute implements Route<CreateBuildingDto, Building> {
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

  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}