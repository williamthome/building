import { UserData } from '@/data/models'

export interface VerifyUserRepository {
  verifyUser: (id: UserData['id']) => Promise<UserData | null>
}
