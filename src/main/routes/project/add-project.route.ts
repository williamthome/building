import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { ActiveCompanyMiddleware, AuthMiddleware, RequirementsMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { AddProjectController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { ProjectEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'
import { ProjectDto } from '@/domain/protocols'

@InjectableArray('routes')
export class AddProjectRoute implements Route<ProjectDto, ProjectEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageProjects)

  constructor (
    @Inject(AddProjectController)
    public readonly controller: AddProjectController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'POST' }
  get path (): string { return '/project' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}