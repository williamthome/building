// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { GetAllProjectAttachmentsUseCase } from '@/domain/usecases'
import { ProjectEntity } from '@/domain/entities'
import { FileEntityResponse } from '@/domain/protocols'

@InjectableController()
export class GetAllProjectAttachmentsController implements Controller<undefined, FileEntityResponse[]> {

  constructor (
    @Inject()
    private readonly getAllProjectAttachmentsUseCase: GetAllProjectAttachmentsUseCase
  ) { }

  @HandleError
  @Validate<undefined, FileEntityResponse[]>({
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest): HandleResponse<FileEntityResponse[]> {
    const requestProjectId = request.params?.id as ProjectEntity['id']

    const allProjectAttachments = await this.getAllProjectAttachmentsUseCase.call(requestProjectId)
    if (!allProjectAttachments)
      return notFound(new EntityNotFoundError('Project'))

    return ok(allProjectAttachments)
  }
}