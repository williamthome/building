import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { UserFeatures } from '@/shared/constants'
import {
  AuthMiddleware,
  UserVerifiedMiddleware,
  ActiveCompanyMiddleware,
  RequirementsMiddleware,
  RequestFileMiddleware
} from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { UploadProjectAttachmentController } from '@/presentation/controllers'
import { UploadFileResponse } from '@/presentation/protocols'
import { mbToBytes } from '@/presentation/helpers/file.helper'

export const uploadProjectAttachmentPath = new RoutePath(
  'POST',
  '/project/:id/attachment'
)

@InjectableArray('routes')
export class UploadProjectAttachmentRoute implements Route<undefined, UploadFileResponse> {
  private readonly requirementsMiddleware = new RequirementsMiddleware(UserFeatures.ManageProjects)
  private readonly requestFileMiddleware = new RequestFileMiddleware({
    count: 1,
    sizeInBytes: mbToBytes(5)
  })

  constructor (
    @InjectRouteController(UploadProjectAttachmentController)
    public readonly controller: UploadProjectAttachmentController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) { }

  get path (): RoutePath { return uploadProjectAttachmentPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.userVerifiedMiddleware,
      this.activeCompanyMiddleware,
      this.requirementsMiddleware,
      this.requestFileMiddleware
    ]
  }
}