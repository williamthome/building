// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { Project } from '@/domain/entities'
import { DeleteProjectUseCase } from '@/domain/usecases'
import { idSchema } from '@/domain/protocols'

@InjectableController()
export class DeleteProjectController implements Controller<undefined, Project> {
  constructor(@Inject() private readonly deleteProjectUseCase: DeleteProjectUseCase) {}

  @HandleError
  @Validate({
    params: {
      schema: idSchema
    }
  })
  async handle(request: HttpRequest): HandleResponse<Project> {
    const projectId = request.params?.id as Project['id']

    const deletedProject = await this.deleteProjectUseCase.call(projectId)
    if (!deletedProject) return notFound(new EntityNotFoundError('Project'))

    return ok(deletedProject)
  }
}
