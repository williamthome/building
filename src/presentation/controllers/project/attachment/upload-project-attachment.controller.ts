// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest, RequestFile, UploadFileResponse } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, ValidateParams } from '@/presentation/decorators'
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

  @ValidateParams<undefined, UploadFileResponse>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleError
  async handle (request: HttpRequest): HandleResponse<UploadFileResponse> {
    const projectId = request.params?.id as ProjectEntity['id']
    const files = request.files as RequestFile[]

    const project = await this.getProjectByIdUseCase.call(projectId)
    if (!project)
      return notFound(new EntityNotFoundError('Project'))

    const result = await uploadResult(
      files,
      projectId,
      this.uploadProjectAttachmentUseCase.call
    )

    return ok(result)
  }
}