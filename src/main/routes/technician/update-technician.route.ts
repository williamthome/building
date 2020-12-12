import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { UpdateTechnicianController } from '@/presentation/controllers'
import { Technician, UpdateTechnicianDto } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const updateTechnicianPath = new RoutePath(
  'PATCH',
  '/technician/:id'
)

@InjectableRoute(updateTechnicianPath)
export class UpdateTechnicianRoute implements Route<UpdateTechnicianDto, Technician> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageTechnicians)

  constructor (
    @InjectRouteController(UpdateTechnicianController)
    public readonly controller: UpdateTechnicianController,

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