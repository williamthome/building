import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { ActiveCompanyMiddleware, AuthMiddleware, RequirementsMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { DeleteProjectController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { ProjectEntity } from '@/domain/entities'
import { UserFeatures } from '@/shared/constants'

@InjectableArray('routes')
export class DeleteProjectRoute implements Route<undefined, ProjectEntity> {
  requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageProjects)

  constructor (
    @Inject(DeleteProjectController)
    public readonly controller: DeleteProjectController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'DELETE' }
  get path (): string { return '/project/:id' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware
    ]
  }
}