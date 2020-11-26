// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { projectSchema, idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateBody, ValidateParams } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { ProjectEntity, projectKeys } from '@/domain/entities'
import { UpdateProjectUseCase } from '@/domain/usecases'
import { ProjectDto } from '@/domain/protocols'

@Injectable()
export class UpdateProjectController implements Controller<ProjectDto, ProjectEntity> {

  constructor (
    @Inject() private readonly updateProjectUseCase: UpdateProjectUseCase
  ) { }

  @ValidateBody<ProjectDto, ProjectEntity>({
    schema: projectSchema,
    keys: projectKeys,
    nullable: true
  })
  @ValidateParams<ProjectDto, ProjectEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleLogError
  async handle (request: HttpRequest<ProjectDto>): HandleResponse<ProjectEntity> {
    const projectId = request.params?.id as ProjectEntity['id']
    const projectDto = request.body as ProjectDto

    const udpatedProject = await this.updateProjectUseCase.call(projectId, projectDto)
    if (!udpatedProject)
      return notFound(new EntityNotFoundError('Project'))

    return ok(udpatedProject)
  }
}