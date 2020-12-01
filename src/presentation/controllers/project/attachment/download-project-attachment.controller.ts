// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, ValidateParams } from '@/presentation/decorators'
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

  @ValidateParams<undefined, Buffer>({
    schema: {
      ...idParamSchema,
      attachmentId: idParamSchemaOptions
    },
    keys: {
      ...idParamKeys,
      attachmentId: 'attachmentId'
    }
  })
  @HandleError
  async handle (request: HttpRequest): HandleResponse<Buffer> {
    const projectId = request.params?.id as ProjectEntity['id']
    const attachmentId = request.params?.attachmentId as FileEntity['id']

    const fille = await this.downloadProjectAttachmentUseCase.call(projectId, attachmentId)
    if (!fille)
      return notFound(new EntityNotFoundError('File'))

    return ok(fille)
  }
}