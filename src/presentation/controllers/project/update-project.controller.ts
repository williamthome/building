// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { UpdateProjectUseCase } from '@/domain/usecases'
import { Project, projectSchema, UpdateProjectDto } from '@/domain/entities'
import { idSchema } from '@/domain/protocols'

@InjectableController()
export class UpdateProjectController implements Controller<UpdateProjectDto, Project> {
  constructor(@Inject() private readonly updateProjectUseCase: UpdateProjectUseCase) {}

  @HandleError
  @Validate({
    body: {
      schema: projectSchema,
      options: {
        allKeys: false,
        bannedFields: ['buildingId']
      }
    },
    params: {
      schema: idSchema
    }
  })
  async handle(request: HttpRequest<UpdateProjectDto>): HandleResponse<Project> {
    const projectId = request.params?.id as Project['id']
    const updateProjectDto = request.body as UpdateProjectDto

    const updatedProject = await this.updateProjectUseCase.call(projectId, updateProjectDto)
    if (!updatedProject) return notFound(new EntityNotFoundError('Project'))

    return ok(updatedProject)
  }
}
