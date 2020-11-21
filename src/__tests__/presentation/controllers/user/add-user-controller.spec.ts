import container from '@/shared/dependency-injection'
// > In: presentation layer
import { AddUserController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { mockUserEntityDto } from '@/__tests__/domain/__mocks__/entities'
import { AddUserUseCaseSpy } from '@/__tests__/domain/__spys__/usecases'
// < Out: only domain layer
import { UserEntity } from '@/domain/entities'

//#region Factories

const userDto = mockUserEntityDto()
const mockHttpRequest = (): HttpRequest<Partial<Omit<UserEntity, 'id'>>> => ({
  body: userDto
})

interface SutTypes {
  sut: AddUserController
  addUserUseCaseSpy: AddUserUseCaseSpy
}

const makeSut = (): SutTypes => {
  const addUserUseCaseSpy = container.resolve<AddUserUseCaseSpy>('addUserUseCase')
  const sut = container.resolve(AddUserController)
  return {
    sut,
    addUserUseCaseSpy
  }
}

//#endregion Factories

describe('AddUser Controller', () => {
  beforeEach(() => {
    container.clear()
    container.bind('addUserUseCase').asNewable(AddUserUseCaseSpy)
    container.bind(AddUserController).asNewable(AddUserController)
  })

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