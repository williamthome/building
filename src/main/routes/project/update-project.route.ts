import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { ActiveCompanyMiddleware, AuthMiddleware, RequirementsMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { UpdateProjectController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { ProjectEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

@InjectableArray('routes')
export class UpdateProjectRoute implements Route<ProjectEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageProjects)

  constructor (
    @Inject(UpdateProjectController)
    public readonly controller: Controller<ProjectEntity>,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'PATCH' }
  get path (): string { return '/project/:id' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}