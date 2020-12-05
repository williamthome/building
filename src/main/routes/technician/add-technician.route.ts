import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { AddTechnicianController } from '@/presentation/controllers'
import { TechnicianEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { TechnicianEntityDto } from '@/domain/protocols'

export const addTechnicianPath = new RoutePath(
  'POST',
  '/technician'
)

@InjectableRoute(addTechnicianPath)
export class AddTechnicianRoute implements Route<TechnicianEntityDto, TechnicianEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageTechnicians)

  constructor (
    @InjectRouteController(AddTechnicianController)
    public readonly controller: AddTechnicianController,

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