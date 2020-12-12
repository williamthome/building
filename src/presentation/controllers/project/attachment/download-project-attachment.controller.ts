// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { DownloadProjectAttachmentUseCase } from '@/domain/usecases'
import { File, Project } from '@/domain/entities'
import { Schema } from '@/domain/protocols/schema'
import { idStringSchema } from '@/domain/protocols'

@InjectableController()
export class DownloadProjectAttachmentController implements Controller<undefined, Buffer> {

  constructor (
    @Inject()
    private readonly downloadProjectAttachmentUseCase: DownloadProjectAttachmentUseCase
  ) { }

  @HandleError
  @Validate({
    params: {
      schema: new Schema({
        id: idStringSchema,
        attachmentId: idStringSchema
      })
    }
  })
  async handle (request: HttpRequest): HandleResponse<Buffer> {
    const projectId = request.params?.id as Project['id']
    const attachmentId = request.params?.attachmentId as File['id']

    const downloadedAttachment = await this.downloadProjectAttachmentUseCase.call(projectId, attachmentId)
    if (!downloadedAttachment)
      return notFound(new EntityNotFoundError('File'))

    return ok(downloadedAttachment)
  }
}