// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { UserAlreadyRegisteredError } from '@/presentation/errors'
// < Out: only domain layer
import { AddUserUseCase, GetUserByEmailUseCase } from '@/domain/usecases'
import { UserVerificationTokenResponse } from '@/domain/protocols'
import { CreateUserDto, createUserSchema } from '@/domain/entities'

@InjectableController()
export class AddUserController implements Controller<CreateUserDto, UserVerificationTokenResponse> {
  constructor(
    @Inject()
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,

    @Inject()
    private readonly addUserUseCase: AddUserUseCase
  ) {}

  @HandleError
  @Validate({
    body: {
      schema: createUserSchema
    }
  })
  async handle(request: HttpRequest<CreateUserDto>): HandleResponse<UserVerificationTokenResponse> {
    const createUserDto = request.body as CreateUserDto

    const findedUser = await this.getUserByEmailUseCase.call(createUserDto.email)
    if (findedUser) return badRequest(new UserAlreadyRegisteredError())

    const { user: createdUserWithoutPassword, verificationToken } = await this.addUserUseCase.call(
      createUserDto
    )

    return ok({
      user: createdUserWithoutPassword,
      verificationToken
    })
  }
}
