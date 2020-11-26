import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { ActiveCompanyMiddleware, AuthMiddleware, RequirementsMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { DeleteBuildingController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { BuildingEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

@InjectableArray('routes')
export class DeleteBuildingRoute implements Route<undefined, BuildingEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageBuildings)

  constructor (
    @Inject(DeleteBuildingController)
    public readonly controller: DeleteBuildingController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'DELETE' }
  get path (): string { return '/building/:id' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}