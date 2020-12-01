// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest, RequestFile, UploadFileResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError, ValidateParams } from '@/presentation/decorators'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
// < Out: only domain layer
import { UploadProjectAttachmentUseCase } from '@/domain/usecases'
import { ProjectEntity } from '@/domain/entities'
import { uploadResult } from '@/presentation/helpers/file.helper'

@Injectable()
export class UploadProjectAttachmentController implements Controller<undefined, UploadFileResponse> {

  constructor (
    @Inject()
    private readonly uploadProjectAttachmentUseCase: UploadProjectAttachmentUseCase,
  ) { }

  @ValidateParams<undefined, UploadFileResponse>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleError
  async handle (request: HttpRequest): HandleResponse<UploadFileResponse> {
    const projectId = request.params?.id as ProjectEntity['id']
    const files = request.files as RequestFile[]

    // !! GET PROJECT BY ID

    const result = await uploadResult(
      files,
      projectId,
      this.uploadProjectAttachmentUseCase
    )

    return ok(result)
  }
}