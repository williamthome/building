// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, ValidateParams } from '@/presentation/decorators'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { GetAllProjectAttachmentsUseCase } from '@/domain/usecases'
import { ProjectEntity } from '@/domain/entities'
import { FileResponse } from '@/domain/protocols'

@Injectable()
export class GetAllProjectAttachmentsController implements Controller<undefined, FileResponse[]> {

  constructor (
    @Inject()
    private readonly getAllProjectAttachmentsUseCase: GetAllProjectAttachmentsUseCase
  ) { }

  @ValidateParams<undefined, FileResponse[]>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleError
  async handle (request: HttpRequest): HandleResponse<FileResponse[]> {
    const projectId = request.params?.id as ProjectEntity['id']

    const files = await this.getAllProjectAttachmentsUseCase.call(projectId)
    if (!files)
      return notFound(new EntityNotFoundError('Project'))

    return ok(files)
  }
}