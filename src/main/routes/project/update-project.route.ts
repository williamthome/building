import { Inject } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { UpdateProjectController } from '@/presentation/controllers'
import { ProjectEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { ProjectEntityDto } from '@/domain/protocols'

export const updateProjectPath = new RoutePath(
  'PATCH',
  '/project/:id'
)

@InjectableRoute(updateProjectPath)
export class UpdateProjectRoute implements Route<ProjectEntityDto, ProjectEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageProjects)

  constructor (
    @InjectRouteController(UpdateProjectController)
    public readonly controller: UpdateProjectController,

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