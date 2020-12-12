import { CreateUserData, UserData } from '@/data/models'

export interface AddUserRepository {
  addUser: (dto: CreateUserData) => Promise<UserData>
}