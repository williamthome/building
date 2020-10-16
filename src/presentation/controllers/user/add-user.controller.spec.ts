import { UserEntity } from '@/domain/entities'
import { EntityDto } from '@/domain/protocols'
import { HttpRequest } from '@/presentation/protocols'
import { mockUserEntityDto } from '@/presentation/__test__/mocks/user-entity-dto.mock'
import { AddUserUseCaseSpy } from '@/presentation/__test__/spys/add-user-usecase.spy'
import { AddUserController } from './add-user.controller'

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

describe('AddUser Controller', async () => {
  describe('AddUser UseCase', async () => {
    fit('should been called with right values', async () => {
      const { sut, addUserUseCaseSpy } = makeSut()
      await sut.handle(mockHttpRequest())
      expect(addUserUseCaseSpy.userDto).toEqual(userDto)
    })
  })
})