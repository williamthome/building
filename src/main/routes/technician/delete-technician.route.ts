import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { DeleteTechnicianController } from '@/presentation/controllers'
import { TechnicianEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const deleteTechnicianPath = new RoutePath(
  'DELETE',
  '/technician/:id'
)

@InjectableArray('routes')
export class DeleteTechnicianRoute implements Route<undefined, TechnicianEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageTechnicians)

  constructor (
    @InjectRouteController(DeleteTechnicianController)
    public readonly controller: DeleteTechnicianController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get path (): RoutePath { return deleteTechnicianPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}