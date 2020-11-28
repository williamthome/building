// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema, memberSchema } from '@/presentation/schemas'
import { HandleError, ValidateBody, ValidateParams } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { AddCompanyMemberUseCase } from '@/domain/usecases'
import { MemberEntity, memberKeys } from '@/domain/entities/nested'

@Injectable()
export class AddCompanyMemberController implements Controller<MemberEntity, CompanyEntity> {

  constructor (
    @Inject() private readonly addCompanyMemberUseCase: AddCompanyMemberUseCase
  ) { }

  @ValidateBody<MemberEntity, CompanyEntity>({
    schema: memberSchema,
    keys: memberKeys
  })
  @ValidateParams<MemberEntity, CompanyEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleError
  async handle (request: HttpRequest<MemberEntity>): HandleResponse<CompanyEntity> {
    const companyId = request.params?.id as CompanyEntity['id']
    const member = request.body as MemberEntity

    const updatedCompany = await this.addCompanyMemberUseCase.call(companyId, member)
    if (!updatedCompany)
      return notFound(new EntityNotFoundError('Company'))

    return ok(updatedCompany)
  }
}