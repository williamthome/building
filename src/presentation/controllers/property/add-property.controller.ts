// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { propertySchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { PropertyEntity, propertyKeys, CompanyEntity } from '@/domain/entities'
import { AddPropertyUseCase } from '@/domain/usecases'
import { PropertyEntityDto } from '@/domain/protocols'

@Injectable()
export class AddPropertyController implements Controller<PropertyEntityDto, PropertyEntity> {

  constructor (
    @Inject()
    private readonly addPropertyUseCase: AddPropertyUseCase
  ) { }

  @HandleError
  @Validate<PropertyEntityDto, PropertyEntity>({
    limited: {
      reference: 'property',
      collectionName: 'properties'
    },
    body: {
      schema: propertySchema,
      keys: propertyKeys
    }
  })
  async handle (request: HttpRequest<PropertyEntityDto>): HandleResponse<PropertyEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const requestPropertyDto = request.body as PropertyEntityDto

    const createdProperty = await this.addPropertyUseCase.call(requestPropertyDto, activeCompanyId)

    return ok(createdProperty)
  }
}