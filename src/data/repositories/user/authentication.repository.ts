import { UserModel } from '@/data/models'

export type AuthModelDto = Pick<UserModel, 'email' | 'password'>

export interface AuthenticationRepository {
  authenticate: (authDto: AuthModelDto) => Promise<UserModel | null>
}