// : Shared
import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
// > In: presentation layer
import { UpdateUserController } from '@/presentation/controllers'
import { badRequest, notFound, ok, serverError } from '@/presentation/factories/http.factory'
import { CanNotFindEntityError, MissingParamError } from '@/presentation/errors'
import { HttpRequest } from '@/presentation/protocols'
// < Out: only domain layer
import { UserDto } from '@/domain/protocols'
import { UpdateUserUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'

//#region Factories

const userId = fakeData.entity.id()
const userDto = mockUserEntityDto()
const mockHttpRequest = (): HttpRequest<UserDto> => ({
  body: userDto,
  params: {
    id: userId
  }
})

interface SutTypes {
  sut: UpdateUserController
  updateUserUseCaseSpy: UpdateUserUseCaseSpy
}

const makeSut = (): SutTypes => {
  const updateUserUseCaseSpy = container.resolve<UpdateUserUseCaseSpy>('updateUserUseCase')
  const sut = container.resolve(UpdateUserController)
  return {
    sut,
    updateUserUseCaseSpy
  }
}

//#endregion Factories

describe('UpdateUser Controller', () => {
  beforeEach(() => {
    container.clear()
    container.bind('updateUserUseCase').asNewable(UpdateUserUseCaseSpy)
    container.bind(UpdateUserController).asNewable(UpdateUserController)
  })

  describe('UpdateUser UseCase', () => {
    it('should been called with right values', async () => {
      const { sut, updateUserUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(updateUserUseCaseSpy.userId).toEqual(userId)
      expect(updateUserUseCaseSpy.userDto).toEqual(userDto)
    })

    it('should return server error if throws', async () => {
      const { sut, updateUserUseCaseSpy } = makeSut()
      updateUserUseCaseSpy.shouldThrow = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    it('should return not found', async () => {
      const { sut, updateUserUseCaseSpy } = makeSut()
      updateUserUseCaseSpy.shouldReturnNull = true
      const response = await sut.handle(mockHttpRequest())
      expect(response).toEqual(notFound(new CanNotFindEntityError('User')))
    })
  })

  it('shold throw if param id is missing', async () => {
    const { sut } = makeSut()
    const httpRequest = { ...mockHttpRequest(), params: undefined }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('id')))
  })

  it('shold return ok with updated user on body', async () => {
    const { sut, updateUserUseCaseSpy } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok(updateUserUseCaseSpy.userEntity))
  })
})