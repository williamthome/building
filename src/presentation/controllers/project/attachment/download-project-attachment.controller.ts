// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, Validate } from '@/presentation/decorators'
import { idParamKeys, idParamSchema, idParamSchemaOptions } from '@/presentation/schemas'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { DownloadProjectAttachmentUseCase } from '@/domain/usecases'
import { FileEntity, ProjectEntity } from '@/domain/entities'

@Injectable()
export class DownloadProjectAttachmentController implements Controller<undefined, Buffer> {

  constructor (
    @Inject()
    private readonly downloadProjectAttachmentUseCase: DownloadProjectAttachmentUseCase
  ) { }

  @Validate<undefined, Buffer>({
    params: {
      schema: {
        ...idParamSchema,
        attachmentId: idParamSchemaOptions
      },
      keys: {
        ...idParamKeys,
        attachmentId: 'attachmentId'
      }
    }
  })
  @HandleError
  async handle (request: HttpRequest): HandleResponse<Buffer> {
    const requestProjectId = request.params?.id as ProjectEntity['id']
    const requestAttachmentId = request.params?.attachmentId as FileEntity['id']

    const downloadedAttachment = await this.downloadProjectAttachmentUseCase.call(requestProjectId, requestAttachmentId)
    if (!downloadedAttachment)
      return notFound(new EntityNotFoundError('File'))

    return ok(downloadedAttachment)
  }
}