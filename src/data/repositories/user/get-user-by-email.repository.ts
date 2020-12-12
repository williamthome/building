import { UserData } from '@/data/models'

export interface GetUserByEmailRepository {
  getUserByEmail: (email: UserData['email']) => Promise<UserData | null>
}