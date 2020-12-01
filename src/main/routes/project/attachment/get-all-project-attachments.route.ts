import { Inject, InjectableArray } from '@/shared/dependency-injection'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { GetAllProjectAttachmentsController } from '@/presentation/controllers'
import { FileResponse } from '@/domain/protocols'

export const getProjectAttachmentsPath = new RoutePath(
  'GET',
  '/project/:id/attachment'
)

@InjectableArray('routes')
export class GetProjectAttachmentsRoute implements Route<undefined, FileResponse[]> {
  constructor (
    @InjectRouteController(GetAllProjectAttachmentsController)
    public readonly controller: GetAllProjectAttachmentsController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get path (): RoutePath { return getProjectAttachmentsPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware
    ]
  }
}