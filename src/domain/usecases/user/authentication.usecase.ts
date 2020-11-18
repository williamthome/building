import { UserEntity } from '@/domain/entities'
import { AuthDto } from '@/domain/protocols'

export interface AuthenticationUseCase {
  call: (authDto: AuthDto) => Promise<UserEntity | null>
}