import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware
} from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { AddProjectController } from '@/presentation/controllers'
import { HttpMethod } from '@/presentation/protocols'
import { ProjectEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { ProjectDto } from '@/domain/protocols'

@InjectableArray('routes')
export class AddProjectRoute implements Route<ProjectDto, ProjectEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageProjects)

  constructor (
    @InjectRouteController(AddProjectController)
    public readonly controller: AddProjectController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get method (): HttpMethod { return 'POST' }
  get path (): string { return '/project' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}