// > In: presentation layer
import { AddUserController } from './add-user.controller'
import { ok, serverError } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { mockUserEntityDto } from '@/presentation/__tests__/__mocks__/user-entity-dto.mock'
import { AddUserUseCaseSpy } from '@/presentation/__tests__/__spys__/add-user-usecase.spy'
// < Out: only domain layer
import { UserEntity } from '@/domain/entities'
import { EntityDto } from '@/domain/protocols'

//#region Factories

const userDto = mockUserEntityDto()
const mockHttpRequest = (): HttpRequest<EntityDto<UserEntity>> => ({
  body: userDto
})

interface SutTypes {
  sut: AddUserController
  addUserUseCaseSpy: AddUserUseCaseSpy
}

const makeSut = (): SutTypes => {
  const addUserUseCaseSpy = new AddUserUseCaseSpy()
  const sut = new AddUserController(addUserUseCaseSpy)
  return {
    sut,
    addUserUseCaseSpy
  }
}

//#endregion Factories

describe('AddUser Controller', () => {
  describe('AddUser UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, addUserUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(addUserUseCaseSpy.userDto).toEqual(userDto)
    })

    it('should return server error if throws', async () => {
      const { sut, addUserUseCaseSpy } = makeSut()
      addUserUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })
  })

  it('shold return ok with a new user on body', async () => {
    const { sut, addUserUseCaseSpy } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok(addUserUseCaseSpy.userEntity))
  })
})