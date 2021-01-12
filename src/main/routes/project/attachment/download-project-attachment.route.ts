import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware, UserVerifiedMiddleware, ActiveCompanyMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { DownloadProjectAttachmentController } from '@/presentation/controllers'

export const downloadProjectAttachmentPath = new RoutePath(
  'GET',
  '/project/:id/attachment/:attachmentId'
)

@InjectableRoute(downloadProjectAttachmentPath)
export class DownloadProjectAttachmentRoute implements Route<undefined, Buffer> {
  constructor(
    @InjectRouteController(DownloadProjectAttachmentController)
    public readonly controller: DownloadProjectAttachmentController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(UserVerifiedMiddleware)
    private readonly userVerifiedMiddleware: Middleware,

    @Inject(ActiveCompanyMiddleware)
    private readonly activeCompanyMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [this.authMiddleware, this.userVerifiedMiddleware, this.activeCompanyMiddleware]
  }
}
