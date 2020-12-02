import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { AddPhaseController } from '@/presentation/controllers'
import { PhaseEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { PhaseEntityDto } from '@/domain/protocols'

export const addPhasePath = new RoutePath(
  'POST',
  '/phase'
)

@InjectableArray('routes')
export class AddPhaseRoute implements Route<PhaseEntityDto, PhaseEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManagePhases)

  constructor (
    @InjectRouteController(AddPhaseController)
    public readonly controller: AddPhaseController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get path (): RoutePath { return addPhasePath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}