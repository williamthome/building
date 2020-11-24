// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema, memberSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateBody, ValidateParams } from '@/presentation/decorators'
import { CanNotFindEntityError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { AddCompanyMemberUseCase } from '@/domain/usecases'
import { Member, memberKeys } from '@/domain/entities/nested'

@Injectable()
export class AddCompanyMemberController implements Controller<Member, CompanyEntity> {

  constructor (
    @Inject() private readonly addCompanyMemberUseCase: AddCompanyMemberUseCase
  ) { }

  @ValidateBody<Member, CompanyEntity>({
    schema: memberSchema,
    keys: memberKeys
  })
  @ValidateParams<Member, CompanyEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleLogError
  async handle (request: HttpRequest<Member>): HandleResponse<CompanyEntity> {
    const companyId = request.params?.id as CompanyEntity['id']
    const member = request.body as Member

    const updatedCompany = await this.addCompanyMemberUseCase.call(companyId, member)
    if (!updatedCompany)
      return notFound(new CanNotFindEntityError('Company'))

    return ok(updatedCompany)
  }
}