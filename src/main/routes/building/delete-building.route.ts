import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { UserFeatures } from '@/shared/constants'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { InjectTransaction } from '@/main/decorators'
import { DeleteBuildingController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { BuildingEntity } from '@/domain/entities'

@InjectableArray('routes')
export class DeleteBuildingRoute implements Route<undefined, BuildingEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageBuildings)

  constructor (
    @InjectTransaction(DeleteBuildingController)
    public readonly controller: DeleteBuildingController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'DELETE' }
  get path (): string { return '/building/:id' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}