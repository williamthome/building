import container from '@/shared/dependency-injection'
// > In: presentation layer
import { AuthenticationController } from '@/presentation/controllers'
import { badRequest, notFound, ok, serverError } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { EntityNotFoundError, PasswordDoNotMatchError } from '@/presentation/errors'
// < Out: only domain layer
import { mockAuthDto } from '@/__tests__/domain/__mocks__/entities'
import { GetUserByEmailUseCaseSpy, UpdateUserAccessTokenUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { AuthDto } from '@/domain/protocols'
import { UserEntity } from '@/domain/entities'

// !! Move to domain layer !!
import { EncrypterSpy, HashComparerSpy } from '@/__tests__/data/__spys__'

//#region Factories

const authDto = mockAuthDto()
const mockHttpRequest = (): HttpRequest<AuthDto> => ({
  body: authDto
})

interface SutTypes {
  sut: AuthenticationController
  getUserByEmailUseCase: GetUserByEmailUseCaseSpy,
  hashComparer: HashComparerSpy,
  encrypter: EncrypterSpy,
  updateUserAccessTokenUseCase: UpdateUserAccessTokenUseCaseSpy
}

const makeSut = (): SutTypes => {
  const getUserByEmailUseCase = container.resolve<GetUserByEmailUseCaseSpy>('getUserByEmailUseCase')
  const hashComparer = container.resolve<HashComparerSpy>('hashComparer')
  const encrypter = container.resolve<EncrypterSpy>('encrypter')
  const updateUserAccessTokenUseCase = container.resolve<UpdateUserAccessTokenUseCaseSpy>('updateUserAccessTokenUseCase')
  const sut = container.resolve(AuthenticationController)
  return {
    sut,
    getUserByEmailUseCase,
    hashComparer,
    encrypter,
    updateUserAccessTokenUseCase
  }
}

//#endregion Factories

describe('AddUser Controller', () => {
  beforeEach(() => {
    container.define('getUserByEmailUseCase').asNewable(GetUserByEmailUseCaseSpy).done()
    container.define('hashComparer').asNewable(HashComparerSpy).done()
    container.define('encrypter').asNewable(EncrypterSpy).done()
    container.define('updateUserAccessTokenUseCase').asNewable(UpdateUserAccessTokenUseCaseSpy).done()
    container.define(AuthenticationController).asNewable(AuthenticationController).done()
  })

  describe('GetUserByEmail UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getUserByEmailUseCase } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(getUserByEmailUseCase.email).toEqual(authDto.email)
    })

    it('should return server error if throws', async () => {
      const { sut, getUserByEmailUseCase } = makeSut()
      getUserByEmailUseCase.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return not found', async () => {
      const { sut, getUserByEmailUseCase } = makeSut()
      getUserByEmailUseCase.shouldReturnNull = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(notFound(new EntityNotFoundError('User')))
    })
  })

  describe('HashComparer', () => {
    it('should been called with right values', async () => {
      const { sut, hashComparer, getUserByEmailUseCase } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(hashComparer.plaintext).toEqual(authDto.password)
      expect(hashComparer.digest).toEqual(getUserByEmailUseCase.userEntity?.password)
    })

    it('should return server error if throws', async () => {
      const { sut, hashComparer } = makeSut()
      hashComparer.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should not match', async () => {
      const { sut, hashComparer } = makeSut()
      hashComparer.shouldNotMatch = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(badRequest(new PasswordDoNotMatchError()))
    })
  })

  describe('Encrypt', () => {
    it('should been called with right values', async () => {
      const { sut, encrypter, getUserByEmailUseCase } = makeSut()
      const httpRequest = mockHttpRequest()
      getUserByEmailUseCase.override = { password: httpRequest.body?.password }
      await sut.handle(httpRequest)
      expect(encrypter.plaintext).toEqual(getUserByEmailUseCase.userEntity?.id)
    })

    it('should return server error if throws', async () => {
      const { sut, encrypter, getUserByEmailUseCase } = makeSut()
      const httpRequest = mockHttpRequest()
      getUserByEmailUseCase.override = { password: httpRequest.body?.password }
      encrypter.shouldThrow = true
      const response = await sut.handle(httpRequest)
      expect(response).toEqual(serverError(new Error()))
    })
  })

  describe('UpdateUserAccessToken UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, updateUserAccessTokenUseCase, getUserByEmailUseCase, encrypter } = makeSut()
      const httpRequest = mockHttpRequest()
      getUserByEmailUseCase.override = { password: httpRequest.body?.password }
      await sut.handle(httpRequest)
      expect(updateUserAccessTokenUseCase.id).toEqual(getUserByEmailUseCase.userEntity?.id)
      expect(updateUserAccessTokenUseCase.accessToken).toEqual(encrypter.encrypted)
    })

    it('should return server error if throws', async () => {
      const { sut, updateUserAccessTokenUseCase, getUserByEmailUseCase } = makeSut()
      const httpRequest = mockHttpRequest()
      getUserByEmailUseCase.override = { password: httpRequest.body?.password }
      updateUserAccessTokenUseCase.shouldThrow = true
      const response = await sut.handle(httpRequest)
      expect(response).toEqual(serverError(new Error()))
    })
  })

  it('shold return authenticated user', async () => {
    const { sut, getUserByEmailUseCase, encrypter } = makeSut()
    const httpRequest = mockHttpRequest()
    getUserByEmailUseCase.override = { password: httpRequest.body?.password }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(getUserByEmailUseCase.userEntity))
    expect((response.body as UserEntity).accessToken).toBe(encrypter.encrypted)
  })
})