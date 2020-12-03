// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { projectSchema, idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { ProjectEntity, projectKeys } from '@/domain/entities'
import { UpdateProjectUseCase } from '@/domain/usecases'
import { ProjectEntityDto } from '@/domain/protocols'

@Injectable()
export class UpdateProjectController implements Controller<ProjectEntityDto, ProjectEntity> {

  constructor (
    @Inject() private readonly updateProjectUseCase: UpdateProjectUseCase
  ) { }

  @HandleError
  @Validate<ProjectEntityDto, ProjectEntity>({
    body: {
      schema: projectSchema,
      keys: projectKeys,
      nullable: true,
      banned: ['buildingId']
    },
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest<ProjectEntityDto>): HandleResponse<ProjectEntity> {
    const requestProjectId = request.params?.id as ProjectEntity['id']
    const requestProjectDto = request.body as ProjectEntityDto

    const updatedProject = await this.updateProjectUseCase.call(requestProjectId, requestProjectDto)
    if (!updatedProject)
      return notFound(new EntityNotFoundError('Project'))

    return ok(updatedProject)
  }
}