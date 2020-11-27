import container from '@/shared/dependency-injection'
// > In: presentation layer
import { AddUserController } from '@/presentation/controllers'
import { badRequest, ok, serverError } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { AddUserUseCaseSpy, GetUserByEmailUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
// < Out: only domain layer
import { UserEntity } from '@/domain/entities'
import { UserAlreadyRegisteredError } from '@/presentation/errors'

//#region Factories

const userDto = mockUserEntityDto()
const mockHttpRequest = (): HttpRequest<Partial<Omit<UserEntity, 'id'>>> => ({
  body: userDto
})

interface SutTypes {
  sut: AddUserController
  getUserByEmailUseCaseSpy: GetUserByEmailUseCaseSpy
  addUserUseCaseSpy: AddUserUseCaseSpy
}

const makeSut = (): SutTypes => {
  const getUserByEmailUseCaseSpy = container.resolve<GetUserByEmailUseCaseSpy>('getUserByEmailUseCase')
  const addUserUseCaseSpy = container.resolve<AddUserUseCaseSpy>('addUserUseCase')
  const sut = container.resolve(AddUserController)
  return {
    sut,
    getUserByEmailUseCaseSpy,
    addUserUseCaseSpy
  }
}

//#endregion Factories

describe('AddUser Controller', () => {
  beforeEach(() => {
    container.define('getUserByEmailUseCase').asNewable(GetUserByEmailUseCaseSpy).done()
    container.define('addUserUseCase').asNewable(AddUserUseCaseSpy).done()
    container.define(AddUserController).asNewable(AddUserController).done()
  })

  describe('AddUser UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getUserByEmailUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(getUserByEmailUseCaseSpy.email).toEqual(userDto.email)
    })

    it('should return server error if throws', async () => {
      const { sut, getUserByEmailUseCaseSpy } = makeSut()
      getUserByEmailUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return server error if throws', async () => {
      const { sut, } = makeSut()
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(badRequest(new UserAlreadyRegisteredError()))
    })
  })

  describe('AddUser UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, getUserByEmailUseCaseSpy, addUserUseCaseSpy } = makeSut()
      getUserByEmailUseCaseSpy.shouldReturnNull = true
      await sut.handle(mockHttpRequest())
      expect(addUserUseCaseSpy.userDto).toEqual(userDto)
    })

    it('should return server error if throws', async () => {
      const { sut, getUserByEmailUseCaseSpy, addUserUseCaseSpy } = makeSut()
      getUserByEmailUseCaseSpy.shouldReturnNull = true
      addUserUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })
  })

  it('shold return ok with a new user on body', async () => {
    const { sut, getUserByEmailUseCaseSpy, addUserUseCaseSpy } = makeSut()
    getUserByEmailUseCaseSpy.shouldReturnNull = true
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok(addUserUseCaseSpy.userVerificationToken))
  })
})