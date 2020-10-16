import { AddUserContract } from './add-user.contract'
import { UserModel } from '@/data/models'
import { AddUserRepository } from '@/data/repositories/user/add-user.repository'
import { ModelDto } from '@/data/protocols/model.protocol'

const userDtoMock: Required<ModelDto<UserModel>> = {
  name: 'Somebody',
  address: 'Someplace'
}

const userMock: UserModel = {
  ...userDtoMock,
  id: 'Someid'
}

const makeAddUserRepositorySpy = (): AddUserRepository => {
  class AddUserUserRepositorySpy implements AddUserRepository {
    addUser = async (): Promise<UserModel> => {
      return await Promise.resolve(userMock)
    }
  }
  return new AddUserUserRepositorySpy()
}

interface SutTypes {
  sut: AddUserContract
  addUserMock: AddUserRepository
}

const makeSut = (): SutTypes => {
  const addUserMock = makeAddUserRepositorySpy()
  const sut = new AddUserContract(addUserMock)
  return {
    sut,
    addUserMock
  }
}

describe('AddUser Contract', () => {
  it('shold return a new user', async () => {
    const { sut } = makeSut()
    const user = await sut.call(userDtoMock)
    expect(user).toBeTruthy()
    expect(user).toEqual(userMock)
  })
})