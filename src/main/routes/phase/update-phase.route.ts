import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { UpdatePhaseController } from '@/presentation/controllers'
import { PhaseEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { PhaseEntityDto } from '@/domain/protocols'

export const updatePhasePath = new RoutePath(
  'PATCH',
  '/phase/:id'
)

@InjectableArray('routes')
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

  get path (): RoutePath { return updatePhasePath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}