// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { ProjectEntity } from '@/domain/entities'
import { DeleteProjectUseCase } from '@/domain/usecases'

@Injectable()
export class DeleteProjectController implements Controller<undefined, ProjectEntity> {

  constructor (
    @Inject() private readonly deleteProjectUseCase: DeleteProjectUseCase
  ) { }

  @HandleError
  @Validate<undefined, ProjectEntity>({
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest): HandleResponse<ProjectEntity> {
    const requestPhaseId = request.params?.id as ProjectEntity['id']

    const deletedProject = await this.deleteProjectUseCase.call(requestPhaseId)
    if (!deletedProject)
      return notFound(new EntityNotFoundError('Project'))

    return ok(deletedProject)
  }
}