// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest, RequestFile, UploadFileResponse } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
import { uploadResult } from '@/presentation/helpers/file.helper'
// < Out: only domain layer
import {  GetProjectByIdUseCase, UploadProjectAttachmentUseCase } from '@/domain/usecases'
import { Project } from '@/domain/entities'
import { idSchema } from '@/domain/protocols'

@InjectableController()
export class UploadProjectAttachmentController implements Controller<undefined, UploadFileResponse> {

  constructor (
    @Inject()
    private readonly getProjectByIdUseCase: GetProjectByIdUseCase,

    @Inject()
    private readonly uploadProjectAttachmentUseCase: UploadProjectAttachmentUseCase
  ) { }

  @HandleError
  @Validate({
    planLimitFor: 'storageMb',
    params: {
      schema: idSchema
    }
  })
  async handle (request: HttpRequest): HandleResponse<UploadFileResponse> {
    const projectId = request.params?.id as Project['id']
    const files = request.files as RequestFile[]

    const findedProject = await this.getProjectByIdUseCase.call(projectId)
    if (!findedProject)
      return notFound(new EntityNotFoundError('Project'))

    const uploadedResult = await uploadResult(
      files,
      projectId,
      this.uploadProjectAttachmentUseCase.call
    )

    return ok(uploadedResult)
  }
}