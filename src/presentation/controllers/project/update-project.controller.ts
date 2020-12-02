// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { projectSchema, idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, ValidateBody, ValidateParams } from '@/presentation/decorators'
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

  @ValidateBody<ProjectEntityDto, ProjectEntity>({
    schema: projectSchema,
    keys: projectKeys,
    nullable: true
  })
  @ValidateParams<ProjectEntityDto, ProjectEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleError
  async handle (request: HttpRequest<ProjectEntityDto>): HandleResponse<ProjectEntity> {
    const projectId = request.params?.id as ProjectEntity['id']
    const projectDto = request.body as ProjectEntityDto

    const updated = await this.updateProjectUseCase.call(projectId, projectDto)
    if (!updated)
      return notFound(new EntityNotFoundError('Project'))

    return ok(updated)
  }
}