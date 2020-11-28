import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { DeleteProjectController } from '@/presentation/controllers'
import { ProjectEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

export const deleteProjectPath = new RoutePath(
  'DELETE',
  '/project/:id'
)

@InjectableArray('routes')
export class DeleteProjectRoute implements Route<undefined, ProjectEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageProjects)

  constructor (
    @InjectRouteController(DeleteProjectController)
    public readonly controller: DeleteProjectController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get path (): RoutePath { return deleteProjectPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}