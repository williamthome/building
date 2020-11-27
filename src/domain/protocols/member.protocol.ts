import { MemberEntity } from '../entities/nested'

export type MemberDto = Partial<Omit<MemberEntity, 'userId'>>