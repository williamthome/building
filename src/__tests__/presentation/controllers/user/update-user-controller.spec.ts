// : Shared
import container from '@/shared/dependency-injection'
import fakeData from '@/__tests__/shared/fake-data'
// > In: presentation layer
import { UpdateUserController } from '@/presentation/controllers'
import { notFound, ok, serverError } from '@/presentation/factories/http.factory'
import { EntityNotFoundError } from '@/presentation/errors'
import { HttpRequest } from '@/presentation/protocols'
// < Out: only domain layer
import { UserEntityDto } from '@/domain/protocols'
import { UpdateUserUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { UserEntity } from '@/domain/entities'

//#region Factories

const userId = fakeData.entity.id()
const userDto = mockUserEntityDto()
const mockHttpRequest = (): HttpRequest<UserEntityDto> => ({
  body: userDto,
  params: {
    id: userId
  },
  loggedUserInfo: {
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
    container.define('updateUserUseCase').asNewable(UpdateUserUseCaseSpy).done()
    container.define(UpdateUserController).asNewable(UpdateUserController).done()
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
      expect(response).toEqual(notFound(new EntityNotFoundError('User')))
    })
  })

  it('shold return ok with updated user on body', async () => {
    const { sut, updateUserUseCaseSpy } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok(userWithoutPassword(updateUserUseCaseSpy.userEntity as UserEntity)))
  })
})