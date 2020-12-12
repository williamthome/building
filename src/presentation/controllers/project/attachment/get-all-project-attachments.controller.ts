// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { GetAllProjectAttachmentsUseCase } from '@/domain/usecases'
import { Project } from '@/domain/entities'
import { FileEntityResponse, idSchema } from '@/domain/protocols'

@InjectableController()
export class GetAllProjectAttachmentsController implements Controller<undefined, FileEntityResponse[]> {

  constructor (
    @Inject()
    private readonly getAllProjectAttachmentsUseCase: GetAllProjectAttachmentsUseCase
  ) { }

  @HandleError
  @Validate({
    params: {
      schema: idSchema
    }
  })
  async handle (request: HttpRequest): HandleResponse<FileEntityResponse[]> {
    const projectId = request.params?.id as Project['id']

    const allProjectAttachments = await this.getAllProjectAttachmentsUseCase.call(projectId)
    if (!allProjectAttachments)
      return notFound(new EntityNotFoundError('Project'))

    return ok(allProjectAttachments)
  }
}