// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest, RequestFile, UploadFileResponse } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, Validate } from '@/presentation/decorators'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { EntityNotFoundError } from '@/presentation/errors'
import { uploadResult } from '@/presentation/helpers/file.helper'
// < Out: only domain layer
import { GetProjectByIdUseCase, UploadProjectAttachmentUseCase } from '@/domain/usecases'
import { ProjectEntity } from '@/domain/entities'

@Injectable()
export class UploadProjectAttachmentController implements Controller<undefined, UploadFileResponse> {

  constructor (
    @Inject()
    private readonly getProjectByIdUseCase: GetProjectByIdUseCase,

    @Inject()
    private readonly uploadProjectAttachmentUseCase: UploadProjectAttachmentUseCase
  ) { }

  @HandleError
  @Validate<undefined, UploadFileResponse>({
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest): HandleResponse<UploadFileResponse> {
    const requestProjectId = request.params?.id as ProjectEntity['id']
    const requestAttachments = request.files as RequestFile[]

    const findedProject = await this.getProjectByIdUseCase.call(requestProjectId)
    if (!findedProject)
      return notFound(new EntityNotFoundError('Project'))

    const uploadedResult = await uploadResult(
      requestAttachments,
      requestProjectId,
      this.uploadProjectAttachmentUseCase.call
    )

    return ok(uploadedResult)
  }
}