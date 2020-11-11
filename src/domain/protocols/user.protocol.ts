import { UserEntity } from '../entities'

export type AddUserDto = Partial<Omit<UserEntity, 'id'>>