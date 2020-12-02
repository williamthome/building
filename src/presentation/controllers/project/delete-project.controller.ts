// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, ValidateParams } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { ProjectEntity } from '@/domain/entities'
import { DeleteProjectUseCase } from '@/domain/usecases'

@Injectable()
export class DeleteProjectController implements Controller<undefined, ProjectEntity> {

  constructor (
    @Inject() private readonly deleteProjectUseCase: DeleteProjectUseCase
  ) { }

  @ValidateParams<undefined, ProjectEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleError
  async handle (request: HttpRequest): HandleResponse<ProjectEntity> {
    const id = request.params?.id as ProjectEntity['id']

    const deleted = await this.deleteProjectUseCase.call(id)
    if (!deleted)
      return notFound(new EntityNotFoundError('Project'))

    return ok(deleted)
  }
}