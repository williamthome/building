import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { DeletePhaseController } from '@/presentation/controllers'
import { PhaseEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const deletePhasePath = new RoutePath(
  'DELETE',
  '/phase/:id'
)

@InjectableArray('routes')
export class DeletePhaseRoute implements Route<undefined, PhaseEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManagePhases)

  constructor (
    @InjectRouteController(DeletePhaseController)
    public readonly controller: DeletePhaseController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get path (): RoutePath { return deletePhasePath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}