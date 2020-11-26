import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { ActiveCompanyMiddleware, AuthMiddleware, RequirementsMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { UpdateBuildingController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { BuildingEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { BuildingDto } from '@/domain/protocols'

@InjectableArray('routes')
export class UpdateBuildingRoute implements Route<BuildingDto, BuildingEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageBuildings)

  constructor (
    @Inject(UpdateBuildingController)
    public readonly controller: UpdateBuildingController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'PATCH' }
  get path (): string { return '/building/:id' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}