import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { UpdatePhaseController } from '@/presentation/controllers'
import { PhaseEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { PhaseEntityDto } from '@/domain/protocols'

export const updatePhasePath = new RoutePath(
  'PATCH',
  '/phase/:id'
)

@InjectableRoute(updatePhasePath)
export class UpdatePhaseRoute implements Route<PhaseEntityDto, PhaseEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManagePhases)

  constructor (
    @InjectRouteController(UpdatePhaseController)
    public readonly controller: UpdatePhaseController,

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